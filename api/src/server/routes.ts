import { Router } from 'express'
import aiServices from './controllers/aiServices'

const routes = Router()

routes.post('/ai/detect-ingredients', ...aiServices.detectIngredients)
routes.post('/ai/generate-recipe', ...aiServices.generateRecipe)

export default routes
