from langchain.agents import create_agent
from langchain.agents.structured_output import ToolStrategy
from supabase import create_client, Client

from app.models.outputs import RecipeGenerationOutput
from app.settings import settings
from app.services.llm import get_llm
from app.services.embeddings import generate_embedding

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
        print(f"Error searching recipes: {e}")
        return []


def run_recipe_generation_agent(
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
    print(f"Found {len(example_recipes)} example recipes for context.")

    parts = ["Create a detailed recipe"]
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
            f"Use these example recipes for inspiration: {example_recipes}",
        ]
    )

    message = "\n".join(lines)

    agent = create_agent(
        model,
        tools=[],
        system_prompt="You are an expert at creating custom recipes based on user preferences.",
        response_format=ToolStrategy(RecipeGenerationOutput),
    )
    result = agent.invoke({"messages": [{"role": "user", "content": message}]})

    return result["structured_response"]
