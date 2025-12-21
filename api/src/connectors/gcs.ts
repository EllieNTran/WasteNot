import { once } from 'events'
import { Storage } from '@google-cloud/storage'
import logger from 'src/logger'
import { Readable } from 'stream'

const client = new Storage({
  apiEndpoint: process.env.STORAGE_URL,
})

const bucket = process.env.BUCKET_NAME as string

interface PutObjectParams {
  key: string;
  body: Readable;
  contentType: string;
  contentLength: number;
}

export const putObject = async (
  { key, body, contentType, contentLength }: PutObjectParams,
): Promise<boolean> => {
  const operationName = 'PUT_OBJECT'

  logger.debug('Putting object', { operationName, bucket, key })

  try {
    const file = client.bucket(bucket).file(key)

    const stream = body.pipe(file.createWriteStream({ metadata: { contentType, contentLength }, resumable: false }))

    await once(stream, 'finish')
    logger.debug('Put object success', { operationName, bucket, key })
    return true
  } catch (error) {
    logger.error(error, 'Error putting object', { operationName, bucket, key })
    return false
  }
}

interface GetObjectParams {
  key: string;
}

export const getObject = async ({ key }: GetObjectParams): Promise<Readable | null> => {
  const operationName = 'GET_OBJECT'

  logger.debug('Getting object from Storage', { operationName, bucket, key })

  try {
    const file = client.bucket(bucket).file(key)
    const result = file.createReadStream().on('error', (err: Error) => {
      logger.error(err, 'Error getting object')
    })

    return result
  } catch (error) {
    logger.error(error, 'Error getting object', { operationName, bucket, key })
    return null
  }
}

interface DeleteObjectParams {
  key: string;
}

export const deleteObject = async ({ key }: DeleteObjectParams): Promise<boolean> => {
  const operationName = 'DELETE_OBJECT'

  logger.info('Deleting object from Storage', { operationName, bucket, key })

  try {
    await client.bucket(bucket).file(key).delete({ ignoreNotFound: true })
    logger.debug('Delete object success', { operationName, bucket, key })
    return true
  } catch (error) {
    logger.error(error, 'Error deleting object', { operationName, bucket, key })
    return false
  }
}
