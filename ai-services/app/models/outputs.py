"""Models for agent outputs"""

from typing import List

from pydantic import BaseModel, Field


class RecipeGenerationOutput(BaseModel):  # pylint:disable=too-few-public-methods
    """Response for recipe generation agent

    Args:
        BaseModel: A base class for creating Pydantic models
    """

    title: str = Field(..., example="Grilled Chicken with Cauliflower and Broccoli")
    description: str = Field(
        ...,
        example="A healthy and delicious grilled chicken recipe served with steamed cauliflower and broccoli.",
    )
    cooking_time: str = Field(..., example="30 minutes")
    ingredient_parts: List[str] = Field(
        ...,
        example=[
            "chicken breast",
            "cauliflower",
            "broccoli",
            "olive oil",
            "salt",
            "pepper",
        ],
    )
    ingredients: List[str] = Field(
        ...,
        example=[
            "200g chicken breast",
            "1 head cauliflower",
            "1 head broccoli",
            "2 tablespoons olive oil",
            "1 teaspoon salt",
            "1/2 teaspoon pepper",
        ],
    )
    instructions: List[str] = Field(
        ...,
        example=[
            "Preheat the grill to medium-high heat.",
            "Season the chicken breast with olive oil, salt, and pepper.",
            "Grill the chicken for 6-7 minutes on each side, or until fully cooked.",
            "Steam the cauliflower and broccoli until tender.",
            "Serve the grilled chicken with the steamed vegetables on the side.",
        ],
    )
    image_url: str | None = Field(
        None, example="https://www.example.com/images/grilled_chicken.jpg"
    )
