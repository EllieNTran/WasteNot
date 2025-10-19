"""Environmental Variables"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Environment variables required by the app"""

    google_api_key: str
    roboflow_api_key: str
    bucket_name: str

settings = Settings()
