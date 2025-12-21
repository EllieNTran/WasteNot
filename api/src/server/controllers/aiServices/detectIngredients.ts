import { Request } from 'express'
import { detectIngredients } from 'src/services/aiServices'
import schemas from 'src/validation/aiServicesSchemas'
import { ControllerResult } from '../withExpress'

interface DetectIngredientsRequestBody {
  imagePath: string;
}

interface DetectIngredientsRequestParams {}

const controller = async (req: Request<DetectIngredientsRequestParams, any, DetectIngredientsRequestBody>): Promise<ControllerResult> => {
  const { imagePath } = req.body

  const { error, value } = schemas.detectIngredients.validate({ imagePath })
  if (error === undefined) {
    const ingredients = await detectIngredients(value.imagePath)
    if (ingredients) {
      return {
        status: 200,
        body: { ingredients },
      }
    }
    // If ingredients is explicitly null or undefined, return 404
    if (ingredients === null || ingredients === undefined) {
      return {
        status: 404,
      }
    }
    throw new Error(`Unexpected value of ingredients: ${ingredients}`)
  }
  return {
    status: 400,
  }
}

export default controller
