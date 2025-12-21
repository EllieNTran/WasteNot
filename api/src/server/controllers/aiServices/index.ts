import detectIngredients from './detectIngredients'
import withExpress from '../withExpress'

export default {
  detectIngredients: withExpress(detectIngredients),
}
