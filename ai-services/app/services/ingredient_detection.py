import tempfile
import os
from inference_sdk import InferenceHTTPClient

from app.settings import settings
from app.connectors.gcs import retrieve_object_from_bucket

client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com",
    api_key=settings.roboflow_api_key
)


def run_ingredient_detection(image_path: str):
    """
    Detect ingredients in the given image using Roboflow Inference API.

    Args:
        image_path (str): Path to the image file in the GCS bucket.
    """
    # Create a temporary file to store the downloaded image
    with tempfile.NamedTemporaryFile(suffix=os.path.splitext(image_path)[-1], delete=False) as temp_file:
        temp_local_path = temp_file.name

    try:
        # Download the image from GCS to the temporary file
        retrieve_object_from_bucket(image_path, temp_local_path)

        # Run the Roboflow workflow using the local file path
        result = client.run_workflow(
            workspace_name="sdl-wastenot",
            workflow_id="detect-count-and-visualize",
            images={
                "image": temp_local_path
            },
            use_cache=True # Speeds up repeated requests
        )

        ingredients_list = extract_ingredients(result[0])
        print("Detected ingredients: ", ingredients_list)
        return ingredients_list
    finally:
        if os.path.exists(temp_local_path):
            os.remove(temp_local_path)


def extract_ingredients(result):
    """
    Extracts unique ingredient names (confidence >= 0.7) from Roboflow result.

    Args:
        result (dict): The result returned by Roboflow workflow.

    Returns:
        List of dicts: [{'ingredient': ...}, ...]
    """
    predictions = result.get('predictions', {}).get('predictions', [])
    seen = set()
    ingredients = []
    for pred in predictions:
        name = pred.get('class')
        confidence = pred.get('confidence', 0)
        if confidence >= 0.7 and name not in seen:
            ingredients.append({'ingredient': name})
            seen.add(name)
    return ingredients
