from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.podcast import podcast_router
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/audio", StaticFiles(directory="audios"), name="audio")
app.include_router(podcast_router, prefix="/api")
