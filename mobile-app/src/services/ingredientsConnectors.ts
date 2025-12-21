import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/src/utils/fetch';

interface UploadImageResponse {
  fileId: string;
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

const uploadImage = async (file: UploadFile): Promise<UploadImageResponse> => {
  const formData = new FormData();
  
  // Check if URI is a base64 data URL (web) or file path (native)
  if (file.uri.startsWith('data:')) {
    const blob = convertBase64ToBlob(file.uri);
    formData.append('file', blob, file.name);
  } else {
    // Native file upload
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
  }

  const response = await apiFetch('/api/storage/upload-image', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Upload failed:', errorText);
    throw new Error(`Upload failed: ${errorText}`);
  }

  return response.json();
};

export const useUploadImage = (options?: any) =>
  useMutation<UploadImageResponse, Error, UploadFile>({
    mutationFn: uploadImage,
    ...options,
  });
