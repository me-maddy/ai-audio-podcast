from pymongo import MongoClient
import os
from uuid import uuid4

MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client["podcast_db"]
episodes = db["episodes"]

AUDIO_DIR = os.path.join(os.getcwd(), "audios")
os.makedirs(AUDIO_DIR, exist_ok=True)


def save_episode(topic: str, script: str, audio_bytes: bytes):
    audio_id = str(uuid4())
    filename = f"{audio_id}.mp3"
    file_path = os.path.join(AUDIO_DIR, filename)

    with open(file_path, "wb") as f:
        f.write(audio_bytes)

    result = episodes.insert_one(
        {"topic": topic, "script": script, "audio_file": filename}
    )

    return {
        "id": str(result.inserted_id),
        "topic": topic,
        "script": script,
        "audio_file": filename,
    }


def get_all_episodes():
    all_episodes = []
    for ep in episodes.find().sort("_id", -1):
        all_episodes.append(
            {
                "id": str(ep["_id"]),
                "topic": ep["topic"],
                "script": ep["script"],
                "audio_file": ep["audio_file"],
            }
        )
    return all_episodes
