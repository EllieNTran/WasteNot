import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/src/utils/fetch';
import { logger } from '@/src/utils/logger';

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
  const MAX_ATTEMPTS = 3;
  const RETRY_DELAY_MS = 60000; // 1 minute
  
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      logger.debug(`Sending request to API for recipe generation`, { attempt, maxAttempts: MAX_ATTEMPTS });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minute timeout
      
      const requestBody = {
        ingredients,
        dietary_preferences: dietaryPreferences,
        allergies,
        meal_type: mealType,
        cooking_time: cookingTime,
      };

      try {
        const response = await apiFetch('ai/generate-recipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        logger.debug('Response received', { status: response.status });

        if (!response.ok) {
          const errorText = await response.text();
          logger.error('Recipe generation failed', { errorText });
          throw new Error(`Recipe generation failed: ${errorText}`);
        }

        const responseText = await response.text();
        const result = responseText ? JSON.parse(responseText) : {};

        return result;

      } catch (error) {
        clearTimeout(timeoutId);
        
        if (error instanceof Error && error.name === 'AbortError') {
          logger.error('Recipe generation timed out after 2 minutes');
          throw new Error('Recipe generation is taking longer than expected. Please try again later.');
        }
        
        throw error;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.error(`Attempt failed`, { attempt, maxAttempts: MAX_ATTEMPTS, error: lastError.message });
      
      if (attempt < MAX_ATTEMPTS) {
        logger.debug(`Retrying`, { delaySeconds: RETRY_DELAY_MS / 1000 });
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }
  
  logger.error(`All attempts failed`, { maxAttempts: MAX_ATTEMPTS });
  throw lastError || new Error('Recipe generation failed after multiple attempts');
};

export const useGenerateRecipe = (options?: any) =>
  useMutation<GenerateRecipeResponse, Error, GenerateRecipeRequest>({
    mutationFn: generateRecipe,
    ...options,
  });
