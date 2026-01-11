"""Environmental Variables"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Environment variables required by the app"""

    google_api_key: str
    roboflow_api_key: str
    bucket_name: str
    supabase_url: str
    supabase_service_role_key: str

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
