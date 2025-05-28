import os
import google.generativeai as genai

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY") or "AIzaSyDvGuZ-SjdPDHZ4DA4s-3EuGg7N04lMY8I"
)


def generate_script(topic: str) -> str:
    prompt = f"Write a 2-minute podcast script about '{topic}'"
    try:
        response = genai.GenerativeModel("gemini-1.5-flash").generate_content(prompt)
    except Exception as e:
        print(f"Error generating script: {e}")
        return "Error generating script"
    return response.text
