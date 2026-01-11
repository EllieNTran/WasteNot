import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/src/utils/fetch';

interface GenerateRecipeRequest {
  ingredients: string[];
  dietaryPreferences: string[];
  allergies: string[];
  mealType: string;
  cookingTime: string;
}

interface GenerateRecipeResponse {
  recipe: any;
}

const generateRecipe = async ({
  ingredients,
  dietaryPreferences,
  allergies,
  mealType,
  cookingTime,
}: GenerateRecipeRequest): Promise<GenerateRecipeResponse> => {
  console.log('Sending request to API...');
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
  
  try {
    const response = await apiFetch('ai/generate-recipe', {
      method: 'POST',
      body: JSON.stringify({
        ingredients,
        dietary_preferences: dietaryPreferences,
        allergies,
        meal_type: mealType,
        cooking_time: cookingTime,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('Response received:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload failed:', errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const result = await response.json();
    console.log('Upload successful:', result);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Upload timed out after 30 seconds');
      throw new Error('Upload request timed out. Please check your connection and try again.');
    }
    
    console.error('Upload request error:', error);
    throw error;
  }
};

export const useGenerateRecipe = (options?: any) =>
  useMutation<GenerateRecipeResponse, Error, GenerateRecipeRequest>({
    mutationFn: generateRecipe,
    ...options,
  });
