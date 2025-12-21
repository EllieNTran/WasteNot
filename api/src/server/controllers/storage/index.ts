import uploadImage from './uploadImage'
import getImage from './getImage'
import withExpress from '../withExpress'
import uploadImageMiddleware from './uploadImageMiddleware'

export default {
  uploadImage: [uploadImageMiddleware, withExpress(uploadImage)],
  getImage: withExpress(getImage),
}
