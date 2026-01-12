import requests
from urllib.parse import quote
import logging

logger = logging.getLogger("template")

BASE_URL = "https://www.themealdb.com/api/json/v1/1"


def get_recipe_image(recipe_name: str, ingredients: list[str]) -> str | None:
    """Fetch a recipe image from TheMealDB using recipe name,
    falling back to ingredient-based search if needed.
    
    Args:
        recipe_name (str): Name of the recipe.
        ingredients (list[str]): List of ingredients in the recipe.
        
    Returns:
        str | None: URL of the recipe image if found, else None.
    """
    logger.info(f"Fetching recipe image for: {recipe_name}")
    
    try:
        response = requests.get(f"{BASE_URL}/search.php?s={quote(recipe_name)}", timeout=5)
        data = response.json()

        if data.get("meals"):
            image_url = data["meals"][0].get("strMealThumb")
            logger.info(f"Found image via recipe name search: {image_url}")
            return image_url
        
    except Exception as e:
        logger.warning(f"Error searching by recipe name: {e}")

    if ingredients:
        try:
            for ingredient in ingredients:
                ingredient = ingredient.strip()
                if not ingredient:
                    continue

                logger.debug(f"Searching by ingredient: {ingredient}")
                response = requests.get(
                    f"{BASE_URL}/filter.php?i={quote(ingredient)}",
                    timeout=5
                )
                data = response.json()

                if data.get("meals"):
                    image_url = data["meals"][0].get("strMealThumb")
                    logger.info(f"Found image via ingredient '{ingredient}': {image_url}")
                    return image_url

        except Exception as e:
            logger.warning(f"Error searching by ingredients: {e}")

    logger.warning("No recipe image found")
    return None
