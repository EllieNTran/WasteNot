import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/src/utils/fetch';
import { supabase } from '@/src/lib/supabase';

interface DetectIngredientsResponse {
  detectedIngredients: any;
}

type UploadFile = {
  uri: string;
  name: string;
  type: string;
};

const convertBase64ToBlob = (base64Data: string): Blob => {
  const parts = base64Data.split(',');
  const contentType = parts[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);
  
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  
  return new Blob([array], { type: contentType });
};

const detectIngredients = async (file: UploadFile): Promise<DetectIngredientsResponse> => {
  const MAX_ATTEMPTS = 3;
  const RETRY_DELAY_MS = 60000; // 1 minute
  
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      console.log(`Sending request to API for ingredient detection... (Attempt ${attempt}/${MAX_ATTEMPTS})`);
      
      console.log('Getting user session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        throw new Error(`Session error: ${sessionError.message}`);
      }
      
      console.log('Session obtained:', session ? 'Yes' : 'No');
      
      const formData = new FormData();
      
      // Check if URI is a base64 data URL (web) or file path (native)
      if (file.uri.startsWith('data:')) {
        const blob = convertBase64ToBlob(file.uri);
        formData.append('file', blob, file.name);
      } else {
        formData.append('file', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        } as any);
      }
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minute timeout
      
      try {
        const response = await apiFetch('ai/detect-ingredients', {
          method: 'POST',
          headers: session?.access_token ? {
            'Authorization': `Bearer ${session.access_token}`,
          } : {},
          body: formData,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        console.log('Response received:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Ingredient detection failed:', errorText);
          throw new Error(`Ingredient detection failed: ${errorText}`);
        }

        const result = await response.json();
        console.log('Ingredient detection successful');
        return result;
      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
          console.error('Ingredient detection timed out');
          throw new Error('Ingredient detection request timed out. Please check your connection and try again.');
        }
        
        throw error;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`Attempt ${attempt}/${MAX_ATTEMPTS} failed:`, lastError.message);
      
      if (attempt < MAX_ATTEMPTS) {
        console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  
  console.error(`All ${MAX_ATTEMPTS} attempts failed`);
  throw lastError || new Error('Ingredient detection failed after multiple attempts');
};

export const useDetectIngredients = (options?: any) =>
  useMutation<DetectIngredientsResponse, Error, UploadFile>({
    mutationFn: detectIngredients,
    ...options,
  });
