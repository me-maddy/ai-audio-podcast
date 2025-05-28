import requests
import os

from app.appConfig import app_config_obj


def generate_audio(script: str) -> bytes:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{app_config_obj.elevenlabs_voice_id}"
    headers = {
        "xi-api-key": app_config_obj.elevenlabs_api_key,
        "Content-Type": "application/json",
    }
    payload = {
        "text": script,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75},
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code != 200:
        raise Exception("TTS failed")
    return response.content
