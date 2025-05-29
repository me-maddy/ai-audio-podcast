# 🎙️ AI-Podcast Generator

A full-stack AI-powered podcast generator that creates podcast episodes from topics using AI, converts them to audio, and serves them on an RSS feed for distribution to podcast platforms.

---

## 🗂️ Project Structure

i-podcast-generator/
├── backend/ # FastAPI backend for script + audio generation
├── rss-service/ # Node.js service that serves the podcast RSS feed
└── frontend/ # Next.js frontend for user interaction

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v18+)
- Python (3.9+)
- npm
- ElevenLabs API key for Text-to-Speech
- Git

---

## 🚀 Installation

Clone the repository:

```
git clone https://github.com/me-maddy/ai-audio-podcast.git
cd ai-podcast-generator
```

1. Backend (FastAPI)
🔌 Features
Generate scripts using Google generativeai.

Convert scripts to audio using ElevenLabs.

Store metadata of podcast episodes.

Location :-
   /backend
Setup :- 
   cd backend
   python -m venv venv
   source venv/bin/activate  # on Windows: venv\Scripts\activate
   pip install -r requirements.txt

Environment Variables
   Create a .env file inside /backend:
   
   openai_api_key=your_open_api_key #We are not using this
   elevenlabs_api_key=your_elevenlabs_api_key
   elevenlabs_voice_id=yuor_elevenlabs_voice_id
   mongo_db_url=your_mongodb_url
   gemini_api_key=your_gemini_api_key
   play_ai_user_id=your_play_ai_user_id  #We are not using this
   play_ai_secret_key=your_ai_secret_key  #We are not using this

Run Backend
   uvicorn app.main:app --reload --port 8000

2. RSS Service (Node.js + TypeScript)
📁 Location
   /rss-service

🔌 Features
Exposes a public XML RSS feed.
Pulls latest podcast data from the backend DB or local JSON.

🛠 Setup
   cd rss-service
   npm install

🛠 Scripts
   npm run dev       # Start in development
   npm run build     # Compile TypeScript
   npm run start     # Run compiled JS

🔐 Environment Variables
Create a .env file in /rss-service:
   PORT = preferred port number
   MONGO_URL = your_db_url
   FRONTEND_URL = your_frontend_url
   BACKEND_URL = your_rss_service_url
   API_URL = your_audio_backend_url

🖥️ 3. Frontend (Next.js)

📁 Location
   /frontend

🛠 Setup
   cd frontend
   npm install

🔐 Environment Variables
Create a .env.local file:
   NEXT_PUBLIC_API_URL=your_backend_url
   NEXT_PUBLIC_AUDIO_URL=your_audio_url

▶️ Run Frontend
   npm run dev

🧪 Example Usage Flow
User enters a topic in the frontend.
Backend generates a script and return it to frontend as a response.
User can customize the script and can generate audio from the script.
Podcast metadata and audio are saved.
RSS service reflects the new episode.

You submit RSS feed URL to platforms like:

  - Apple Podcasts
  - Google Podcasts
  - Pocket Casts
