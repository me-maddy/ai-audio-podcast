from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fastapi.responses import FileResponse
import os
from app.services.gpt_service import generate_script
from app.services.tts_service import generate_audio
from app.services.mongo import save_episode, get_all_episodes


podcast_router = APIRouter()


class TopicRequest(BaseModel):
    topic: str


class ScriptRequest(BaseModel):
    script: str
    topic: str


@podcast_router.post("/submit-topic")
async def submit_topic(data: TopicRequest):
    try:
        script = generate_script(data.topic)
        return {"success": True, "script": script}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@podcast_router.get("/episodes")
async def fetch_all_episodes():
    try:
        return get_all_episodes()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@podcast_router.post("/generate-audio")
async def generate_audio_endpoint(data: ScriptRequest):
    try:
        audio_bytes = generate_audio(data.script)
        episode = save_episode(data.topic, data.script, audio_bytes)
        return {"success": True, "episode": episode}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))


@podcast_router.get("/audio/{filename}")
async def get_audio_file(filename: str):
    file_path = os.path.join(os.getcwd(), "audios", filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg", filename=filename)
    raise HTTPException(status_code=404, detail="Audio file not found")
