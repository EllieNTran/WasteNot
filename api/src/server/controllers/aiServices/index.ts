import detectIngredients from './detectIngredients'
import generateRecipe from './generateRecipe'
import withExpress from '../withExpress'
import detectIngredientsMiddleware from './detectIngredientsMiddleware'

export default {
  detectIngredients: [detectIngredientsMiddleware, withExpress(detectIngredients)],
  generateRecipe: [withExpress(generateRecipe)],
}
