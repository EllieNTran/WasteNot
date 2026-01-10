import crypto from 'crypto'
import multer from 'multer'
import logger from 'src/logger'
import { Request, Response, NextFunction } from 'express'

declare module 'express' {
  export interface Request {
    file?: Express.Multer.File;
  }
}

const allowedMimeTypes = [
  'image/png',
  'image/jpg',
  'image/jpeg',
]

const multipartParser = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    let approve = false
    if (allowedMimeTypes.includes(file.mimetype)) {
      approve = true
    }
    if (!approve) {
      logger.warn('Image is invalid', { operationName: 'FILE_FILTER', mimetype: file.mimetype })
    }
    cb(null, approve)
  },
  storage: multer.diskStorage({
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      cb(null, crypto.randomUUID())
    },
  }),
}).single('file')

const catchValidationErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  logger.warn('Malformed multipart data when trying to upload image', { operationName: 'MULTER_VAlIDATION', error: error.message })
  res.sendStatus(400)
}

const fileRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    logger.warn('Attempted to upload an image without a file', { operationName: 'FILE_VALIDATION' })
    res.sendStatus(400)
    return
  }

  next()
}

export default [multipartParser, catchValidationErrors, fileRequired]
