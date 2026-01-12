import logging
from supabase import create_client, Client

from app.models.outputs import RecipeGenerationOutput
from app.settings import settings
from app.services.llm import get_llm
from app.services.embeddings import generate_embedding
from app.services.get_recipe_image import get_recipe_image

logger = logging.getLogger(__name__)

model = get_llm()
client: Client = create_client(
    settings.supabase_url, settings.supabase_service_role_key
)

def search_recipes_by_ingredients(ingredients: list[str], top_k: int = 5) -> list[dict]:
    """Performs a vector similarity search in Supabase recipes table based on user ingredients.
    Returns top_k most similar recipes.
    """
    try:
        ingredients_text = ", ".join(ingredients)
        embedding = generate_embedding(ingredients_text)

        response = client.rpc(
            "search_recipes", {"user_embedding": embedding, "top_k": top_k}
        ).execute()

        return response.data

    except Exception as e:
        logger.warning(f"Error searching recipes: {e}")
        return []


def run_recipe_generation(
    ingredients: list,
    dietary_preferences: list,
    allergies: list,
    meal_type: str,
    cooking_time: str,
):
    """Runs an agent to generate a recipe based on user inputs and example recipes from the database.

    Args:
        ingredients (list): List of ingredients available to the user.
        dietary_preferences (list): List of dietary preferences.
        allergies (list): List of allergies to avoid.
        meal_type (str): Type of meal (e.g., breakfast, lunch, dinner).
        cooking_time (str): Desired cooking time.
    """
    example_recipes = search_recipes_by_ingredients(ingredients=ingredients)
    logger.info(f"Found {len(example_recipes)} example recipes for context.")

    parts = ["You are an expert at creating detailed recipes. Create a recipe"]
    if meal_type:
        parts.append(f"for {meal_type}")
    if cooking_time:
        parts.append(f"that can be prepared in {cooking_time}")

    lines = [
        " ".join(parts) + ".",
        f"Use the following ingredients: {', '.join(ingredients)}.",
    ]

    if dietary_preferences:
        lines.append(
            f"Consider these dietary preferences: {', '.join(dietary_preferences)}."
        )
    if allergies:
        lines.append(f"Avoid these allergies: {', '.join(allergies)}.")

    lines.extend(
        [
            "Provide step-by-step cooking instructions and a list of required ingredients with quantities.",
            "For ingredients, provide two separate lists:",
            "1. ingredient_parts: just the ingredient names (e.g., 'chicken breast', 'cabbage', 'onion')",
            "2. ingredients: full ingredient details with quantities (e.g., '200g chicken breast', '1 head cabbage', '1 medium onion')",
            f"Use these example recipes for inspiration: {example_recipes}",
            "Use the get_recipe_image tool to fetch an appropriate image for the recipe you create.",
        ]
    )
    prompt = "\n".join(lines)

    logger.info("Generating recipe...")
    recipe = model.with_structured_output(RecipeGenerationOutput).invoke(prompt)

    image_url = get_recipe_image(recipe.title, recipe.ingredient_parts)
    recipe.image_url = image_url

    return recipe
