from google import genai
from google.genai import types
from app.settings import settings

client = genai.Client(api_key=settings.google_api_key)

def generate_embedding(text):
    """Generate embeddings for the given text using Gemini Embedding model.
    
    Args: 
        text (str): The input text to be embedded.
        
    Returns:
        List of floats representing the embedding vector.
    """
    result = client.models.embed_content(
        model="gemini-embedding-001",
        contents=text,
        config=types.EmbedContentConfig(output_dimensionality=1536)
    )

    return result.embeddings[0].values
