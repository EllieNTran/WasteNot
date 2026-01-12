"""LLM Service"""

from langchain_google_genai import ChatGoogleGenerativeAI

from app.settings import settings


def get_llm():
    """Get the LLM instance"""
    return ChatGoogleGenerativeAI(
        model="gemini-2.5-flash", temperature=0.3, api_key=settings.google_api_key
    )
