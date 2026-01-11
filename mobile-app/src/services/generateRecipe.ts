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
  console.log('Ingredients:', ingredients);
  console.log('Dietary Preferences:', dietaryPreferences);
  console.log('Allergies:', allergies);
  console.log('Meal Type:', mealType);
  console.log('Cooking Time:', cookingTime);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
  
  try {
    const response = await apiFetch('ai/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
      console.error('Recipe generation failed:', errorText);
      throw new Error(`Recipe generation failed: ${errorText}`);
    }

    const result = await response.json();
    console.log('Recipe generation successful:', result);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('Recipe generation timed out after 2 minutes');
      throw new Error('Recipe generation is taking longer than expected. Please try again later.');
    }
    
    console.error('Recipe generation request error:', error);
    throw error;
  }
};

export const useGenerateRecipe = (options?: any) =>
  useMutation<GenerateRecipeResponse, Error, GenerateRecipeRequest>({
    mutationFn: generateRecipe,
    ...options,
  });
