import { Router } from 'express'
import aiServices from './controllers/aiServices'
import storage from './controllers/storage'

const routes = Router()

routes.post('/ai/detect-ingredients', aiServices.detectIngredients)
routes.post('/storage/upload-image', ...storage.uploadImage)

export default routes
