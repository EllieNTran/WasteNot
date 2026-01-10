import Joi from 'joi'

const uuid = () => Joi.string().guid({
  version: 'uuidv4',
  separator: '-',
})

const detectIngredientsSchema = Joi.object({
  imagePath: Joi.string().required(),
})

export default {
  detectIngredients: detectIngredientsSchema,
}

export {
  detectIngredientsSchema,
}
