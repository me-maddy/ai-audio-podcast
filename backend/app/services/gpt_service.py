import os
import google.generativeai as genai

from app.appConfig import app_config_obj

genai.configure(
    api_key=app_config_obj.gemini_api_key
)


def generate_script(topic: str) -> str:
    prompt = f"Write a 2-minute podcast script about '{topic}'"
    try:
        response = genai.GenerativeModel("gemini-1.5-flash").generate_content(prompt)
    except Exception as e:
        print(f"Error generating script: {e}")
        return "Error generating script"
    return response.text
