import { putObject } from '../../connectors/storage'
import crypto from 'crypto'
import fs from 'fs'
import logger from '../../logger'
import { extension } from 'mime-types'

const uploadImage = async (file: Express.Multer.File, authToken?: string, userId?: string): Promise<string | null> => {
    const fileId = crypto.randomUUID()
    // Get extension from mimetype, fallback to 'jpg' if not found
    const ext = extension(file.mimetype) || 'jpg'
    const imagePath = userId ? `${userId}/${fileId}.${ext}` : `${fileId}.${ext}`
    logger.info('Uploading file', { file: file.filename, path: imagePath })

    const putResult = await putObject({
      key: imagePath,
      body: fs.createReadStream(file.path),
      contentLength: file.size,
      contentType: file.mimetype,
      authToken,
    })

    if (!putResult) return null
    return fileId
}

export default uploadImage
