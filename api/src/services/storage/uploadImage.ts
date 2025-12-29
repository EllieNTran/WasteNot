import { putObject } from '../../connectors/storage'
import crypto from 'crypto'
import fs from 'fs'
import logger from '../../logger'
import { lookup } from 'mime-types'

const uploadImage = async (file: Express.Multer.File, authToken?: string, userId?: string): Promise<string | null> => {
    const fileId = crypto.randomUUID()
    const extension = lookup(file.mimetype) as string // mime-types lookup can return false, which is not handled here.
    const imagePath = userId ? `${userId}/${fileId}.${extension}` : `${fileId}.${extension}`
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
