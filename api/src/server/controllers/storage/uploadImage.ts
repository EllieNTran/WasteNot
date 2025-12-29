import { Request } from 'express';
import { uploadImage } from 'src/services/storage';
import { ControllerResult } from '../withExpress';

declare module 'express' {
  export interface Request {
    file?: Express.Multer.File;
  }
}

const controller = async (req: Request): Promise<ControllerResult> => {
  console.log('Received upload image request', req);
  if (!req.file) {
    return {
      status: 400,
      body: {
        message: 'File is required',
      },
    };
  }

  // Extract auth token from Authorization header
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : undefined;

  // Decode JWT to get user ID (JWT payload is base64 encoded)
  let userId: string | undefined;
  if (authToken) {
    try {
      const payload = JSON.parse(Buffer.from(authToken.split('.')[1], 'base64').toString());
      userId = payload.sub; // 'sub' contains the user ID in Supabase JWTs
    } catch (error) {
      console.error('Failed to decode JWT:', error);
    }
  }

  const fileId = await uploadImage(req.file, authToken, userId);
  if (fileId === null) {
    return {
      status: 500,
      body: {
        message: 'Failed to upload image',
      },
    };
  }

  return {
    status: 201,
    body: { fileId },
  };
};

export default controller;
