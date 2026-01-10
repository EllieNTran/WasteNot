"""Models for agent outputs"""

from typing import List

from pydantic import BaseModel, Field


class RecipeGenerationOutput(BaseModel):  # pylint:disable=too-few-public-methods
    """Response for recipe generation agent

    Args:
        BaseModel: A base class for creating Pydantic models
    """

    title: str = Field(..., example="Grilled Chicken with Cauliflower and Broccoli")
    cooking_time: str = Field(..., example="30 minutes")
    ingredients: List[str] = Field(
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
