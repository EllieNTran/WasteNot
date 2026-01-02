import axios from 'axios';
import logger from 'src/logger'
import uploadImage from 'src/services/storage/uploadImage';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const detectIngredients = async (file: Express.Multer.File, authToken?: string, userId?: string): Promise<string | null> => {
  const uploadedFilePath = await uploadImage(file, authToken, userId);
  if (!uploadedFilePath) {
    logger.error('Failed to upload image for ingredient detection');
    return null;
  }

  try {
    const response = await axios.post<{ error?: string; message: string }>(`${AI_SERVICE_URL}/detect-ingredients`, {
      image: uploadedFilePath
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.message;
  } catch (error: any) {
    console.error('Error detecting ingredients:', error.message);
    return null
  }
}

export default detectIngredients;
