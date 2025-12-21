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

  const fileId = await uploadImage(req.file);
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
