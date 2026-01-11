import { createClient } from '@supabase/supabase-js'
import logger from 'src/logger'
import { Readable } from 'stream'

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

const bucket = process.env.BUCKET_NAME as string

interface PutObjectParams {
  key: string;
  body: Readable;
  contentType: string;
  contentLength: number;
  authToken?: string;
}

export const putObject = async (
  { key, body, contentType, authToken }: PutObjectParams,
): Promise<boolean> => {
  const operationName = 'PUT_OBJECT'

  logger.debug('Putting object', { operationName, bucket, key })

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      },
    })

    const chunks: Buffer[] = []
    for await (const chunk of body) {
      chunks.push(Buffer.from(chunk))
    }
    const buffer = Buffer.concat(chunks)

    const { error } = await supabase.storage
      .from(bucket)
      .upload(key, buffer, {
        contentType,
        upsert: true,
      })

    if (error) {
      logger.error(error, 'Error putting object', { operationName, bucket, key })
      return false
    }

    logger.debug('Put object success', { operationName, bucket, key })
    return true
  } catch (error) {
    logger.error(error, 'Error putting object', { operationName, bucket, key })
    return false
  }
}

interface GetObjectParams {
  key: string;
  authToken?: string;
}

export const getObject = async ({ key, authToken }: GetObjectParams): Promise<Readable | null> => {
  const operationName = 'GET_OBJECT'

  logger.debug('Getting object from Storage', { operationName, bucket, key })

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      },
    })

    const { data, error } = await supabase.storage
      .from(bucket)
      .download(key)

    if (error || !data) {
      logger.error(error, 'Error getting object', { operationName, bucket, key })
      return null
    }

    // Convert Blob to Readable stream
    const buffer = Buffer.from(await data.arrayBuffer())
    const stream = Readable.from(buffer)

    return stream
  } catch (error) {
    logger.error(error, 'Error getting object', { operationName, bucket, key })
    return null
  }
}

interface DeleteObjectParams {
  key: string;
  authToken?: string;
}

export const deleteObject = async ({ key, authToken }: DeleteObjectParams): Promise<boolean> => {
  const operationName = 'DELETE_OBJECT'

  logger.info('Deleting object from Storage', { operationName, bucket, key })

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      },
    })

    const { error } = await supabase.storage
      .from(bucket)
      .remove([key])

    if (error) {
      logger.error(error, 'Error deleting object', { operationName, bucket, key })
      return false
    }

    logger.debug('Delete object success', { operationName, bucket, key })
    return true
  } catch (error) {
    logger.error(error, 'Error deleting object', { operationName, bucket, key })
    return false
  }
}
