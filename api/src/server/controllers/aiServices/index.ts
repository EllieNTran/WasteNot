import detectIngredients from './detectIngredients'
import withExpress from '../withExpress'
import detectIngredientsMiddleware from './detectIngredientsMiddleware'

export default {
  detectIngredients: [detectIngredientsMiddleware, withExpress(detectIngredients)],
}
