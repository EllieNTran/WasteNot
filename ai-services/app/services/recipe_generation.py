from app.services.llm import get_llm
from app.models.outputs import RecipeGenerationOutput

model = get_llm()
model_with_structure = model.with_structured_output(RecipeGenerationOutput)


def run_recipe_generation(ingredients: list, dietary_preferences: list):
    """Runs the recipe generation model with given ingredients and dietary preferences

    Args:
        ingredients: list of ingredients
        dietary_preferences: list of dietary preferences

    Returns:
        The generated recipe
    """
    result = model_with_structure.invoke(f"Generate a recipe with the following ingredients: {', '.join(ingredients)} and dietary preferences: {', '.join(dietary_preferences)}.")
    return result
