import axios from 'axios';
import logger from 'src/logger';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const generateRecipe = async (
  ingredients: string[],
  dietaryPreferences: string[],
  allergies: string[],
  mealType: string,
  cookingTime: string,
): Promise<string | null> => {
  try {
    logger.info('Sending request to AI service for recipe generation');
    const response = await axios.post<{ error?: string; recipe: any }>(
      `${AI_SERVICE_URL}/generate-recipe`,
      {
        ingredients,
        dietary_preferences: dietaryPreferences,
        allergies,
        meal_type: mealType,
        cooking_time: cookingTime,
      },
    );

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.recipe;
  } catch (error: any) {
    logger.error('Error generating recipe:', error.message);
    throw error;
  }
}

export default generateRecipe;
