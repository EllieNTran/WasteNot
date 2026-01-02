import { Router } from 'express'
import aiServices from './controllers/aiServices'

const routes = Router()

routes.post('/ai/detect-ingredients', ...aiServices.detectIngredients)

export default routes
