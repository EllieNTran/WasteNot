"""Models for requests"""

from typing import List

from pydantic import BaseModel, Field


class RecipeGenerationRequest(BaseModel):  # pylint:disable=too-few-public-methods
    """Request for recipe generation endpoint

    Args:
        BaseModel: A base class for creating Pydantic models
    """

    ingredients: List[str] = Field(
        ..., example=["chicken", "cauliflower", "broccoli", "onion"]
    )
    dietary_preferences: List[str] = Field(..., example=["gluten-free", "vegetarian"])
    allergies: List[str] = Field(..., example=["peanuts", "shellfish"])
    meal_type: str = Field(..., example="dinner")
    cooking_time: str = Field(..., example="30 minutes")


class IngredientDetectionRequest(BaseModel):  # pylint:disable=too-few-public-methods
    """Request for ingredient detection endpoint

    Args:
        BaseModel: A base class for creating Pydantic models
    """

    image: str = Field(..., example="path/to/image.jpg")
    authToken: str | None = None
