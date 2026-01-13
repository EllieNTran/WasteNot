import tempfile
import logging
import os
from inference_sdk import InferenceHTTPClient

from app.settings import settings
from app.connectors.storage import retrieve_object_from_bucket

logger = logging.getLogger("template")

client = InferenceHTTPClient(
    api_url="https://serverless.roboflow.com", api_key=settings.roboflow_api_key
)


def run_ingredient_detection(image_path: str):
    """Detect ingredients in the given image using Roboflow Inference API.

    Args:
        image_path (str): Path to the image file in the Supabase bucket.
    """
    with tempfile.NamedTemporaryFile(
        suffix=os.path.splitext(image_path)[-1], delete=False
    ) as temp_file:
        temp_local_path = temp_file.name

    try:
        retrieve_object_from_bucket(image_path, temp_local_path)
        logger.info("Detecting ingredients...")

        result = client.run_workflow(
            workspace_name="sdl-wastenot",
            workflow_id="detect-count-and-visualize",
            images={"image": temp_local_path},
            use_cache=True,
        )
        ingredients_list = extract_ingredients(result[0])

        return ingredients_list
    finally:
        if os.path.exists(temp_local_path):
            os.remove(temp_local_path)


def extract_ingredients(result):
    """Extracts unique ingredient names (confidence >= 0.7) from Roboflow result.

    Args:
        result (dict): The result returned by Roboflow workflow.

    Returns:
        List of dicts: [{'ingredient': ...}, ...]
    """
    logger.info("Extracting ingredients from detection result")
    predictions = result.get("predictions", {}).get("predictions", [])
    seen = set()
    ingredients = []

    for pred in predictions:
        name = pred.get("class")
        confidence = pred.get("confidence", 0)
        if confidence >= 0.7 and name not in seen:
            ingredients.append({"ingredient": name})
            seen.add(name)

    return ingredients
