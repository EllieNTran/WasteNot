import { Request } from 'express'
import { ControllerResult } from '../withExpress'
import { generateRecipe } from 'src/services/aiServices'
import logger from 'src/logger'

const controller = async (req: Request): Promise<ControllerResult> => {
  const { ingredients, dietary_preferences, allergies, meal_type, cooking_time } = req.body

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return {
      status: 400,
      body: {
        message: 'Ingredients are required',
      },
    }
  }

  try {
    const recipe = await generateRecipe(
      ingredients,
      dietary_preferences || [],
      allergies || [],
      meal_type || '',
      cooking_time || ''
    )
    logger.debug('Generated recipe', { recipe })

    if (!recipe) {
      logger.error('Recipe generation returned null or undefined');
      return {
        status: 500,
        body: {
          message: 'Failed to generate recipe',
        },
      }
    }

    return {
      status: 200,
      body: { recipe },
    }
  } catch (error: any) {
    logger.error('Error in generateRecipe controller:', error);
    return {
      status: 500,
      body: {
        message: error.message || 'Failed to generate recipe',
      },
    }
  }
}

export default controller
