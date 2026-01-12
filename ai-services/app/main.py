import logging
import logging.config
from fastapi import FastAPI

from app.models.requests import RecipeGenerationRequest, IngredientDetectionRequest
from app.services.recipe_generation import run_recipe_generation
from app.services.ingredient_detection import run_ingredient_detection
from app.services.logger import LogConfig

logging.config.dictConfig(LogConfig().model_dump())
logger = logging.getLogger("template")

app = FastAPI()


@app.post(
    "/generate-recipe",
    summary="Generate a recipe based on given ingredients and dietary preferences",
)
async def generate_recipe(request: RecipeGenerationRequest):
    """API endpoint to generate a recipe

    Args:
        request: json body containing the ingredients and dietary preferences

    Returns:
        The generated recipe as a string
    """
    try:
        logger.info("Received request for recipe generation")
        response = run_recipe_generation(
            request.ingredients,
            request.dietary_preferences,
            request.allergies,
            request.meal_type,
            request.cooking_time,
        )
        return {"recipe": response}
    except Exception as e:
        return {"error": str(e)}


@app.post(
    "/detect-ingredients",
    summary="Detect ingredients in a given image",
)
async def detect_ingredients(request: IngredientDetectionRequest):
    """API endpoint to detect ingredients in an image

    Args:
        request: json body containing the image path

    Returns:
        The detected ingredients as a list
    """
    try:
        logger.info("Received request for ingredient detection")
        response = run_ingredient_detection(request.image)
        return {"ingredients": response}
    except Exception as e:
        return {"error": str(e)}
