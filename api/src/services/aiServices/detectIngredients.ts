import axios from 'axios';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

const detectIngredients = async (imagePath: string): Promise<string | null> => {
  try {
    const response = await axios.post<{ error?: string; message: string }>(`${AI_SERVICE_URL}/detect-ingredients`, {
      image: imagePath
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    return response.data.message;
  } catch (error: any) {
    console.error('Error detecting ingredients:', error.message);
    // Depending on the desired behavior, you might want to return null or re-throw a more specific error
    return null; // Or throw new Error(`Failed to detect ingredients: ${error.message}`);
  }
}

export default detectIngredients;
