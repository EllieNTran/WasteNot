from fastapi import FastAPI

from app.models.requests import RecipeGenerationRequest, IngredientDetectionRequest
from app.services.recipe_generation import run_recipe_generation
from app.services.ingredient_detection import run_ingredient_detection

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
        response = run_recipe_generation(request.ingredients, request.dietary_preferences)
        return {"message": response}
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
        print("Received request for ingredient detection: ", request)
        response = run_ingredient_detection(request.image, request.authToken)
        return {"message": response}
    except Exception as e:
        return {"error": str(e)}
