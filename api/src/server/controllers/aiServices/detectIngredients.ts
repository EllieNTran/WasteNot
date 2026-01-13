import { Request } from 'express';
import { detectIngredients } from 'src/services/aiServices';
import { ControllerResult } from '../withExpress';
import logger from 'src/logger';

declare module 'express' {
  export interface Request {
    file?: Express.Multer.File;
  }
}

const controller = async (req: Request): Promise<ControllerResult> => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

  let userId: string | undefined;
  if (authToken) {
    try {
      const payload = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
      userId = payload.sub;
    } catch (error) {
      logger.error('Failed to decode JWT:', error);
    }
  }

  const detectedIngredients = await detectIngredients(req.file!, authToken, userId);
  logger.debug('Detected ingredients', { detectedIngredients });

  if (detectedIngredients === null) {
    return {
      status: 500,
      body: {
        message: 'Failed to detect ingredients',
      },
    };
  }

  return {
    status: 201,
    body: { detectedIngredients },
  };
};

export default controller;
