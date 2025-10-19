from app.services.llm import get_llm
from app.models.outputs import RecipeGenerationOutput

model = get_llm()
model_with_structure = model.with_structured_output(RecipeGenerationOutput)


async def run_recipe_generation_agent(ingredients: list, dietary_preferences: list):
    """Run the recipe generation agent"""
    result = model_with_structure.invoke(f"Generate a recipe with the following ingredients: {', '.join(ingredients)} and dietary preferences: {', '.join(dietary_preferences)}.")
    return result
