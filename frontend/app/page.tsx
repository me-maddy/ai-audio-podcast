"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationConfig from "./appConfig";
import Link from "next/link";

export type Episode = {
  id: string;
  topic: string;
  script: string;
  audio_file: string;
};

export default function HomePage() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      const res = await axios.get(`${ApplicationConfig.BACKEND_URI}/episodes`);
      setEpisodes(res.data);
    } catch (err) {
      console.error("Error fetching episodes:", err);
    }
  };

  const handleGenerateScript = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${ApplicationConfig.BACKEND_URI}/submit-topic`,
        {
          topic,
        }
      );
      setScript(res.data.script);
    } catch (err) {
      console.error("Error generating script:", err);
    }
    setLoading(false);
  };

  const handleGeneratePodcast = async () => {
    if (!script) return;
    setLoading(true);
    try {
      const res = await axios.post(
        `${ApplicationConfig.BACKEND_URI}/generate-audio`,
        {
          topic,
          script,
        }
      );
      setSelectedEpisode(res.data.episode);
      fetchEpisodes();
    } catch (err) {
      console.error("Error generating podcast:", err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🎙️ AI Podcast Generator</h1>
      <input
        type="text"
        placeholder="Enter podcast topic..."
        className="p-3 w-full max-w-md border rounded mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <button
        onClick={handleGenerateScript}
        className="bg-blue-600 text-white px-5 py-2 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Generating Script..." : "Generate Script"}
      </button>

      {script && (
        <>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full max-w-2xl h-40 p-3 border rounded mb-4"
          />
          <button
            onClick={handleGeneratePodcast}
            className="bg-green-600 text-white px-5 py-2 rounded mb-8"
            disabled={loading}
          >
            {loading ? "Generating Podcast..." : "Generate Audio & Save"}
          </button>
        </>
      )}

      {selectedEpisode && (
        <div className="w-full max-w-2xl bg-white p-5 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Topic: {selectedEpisode.topic}
          </h2>
          <p className="mb-4 whitespace-pre-wrap">{selectedEpisode.script}</p>
          <audio
            controls
            className="w-full"
            src={`${ApplicationConfig.AUDIO_URL}/${selectedEpisode.audio_file}`}
          ></audio>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4">
        📚 Previous Episodes{" "}
        <Link
          href="/episodes"
          className="text-blue-500 hover:text-blue-700 hover:translate-x-1 inline-block hover:underline transition-all duration-200 ease-linear text-xl hover:cursor-pointer"
        >
          View All
        </Link>
      </h2>

      <div className="w-full max-w-2xl">
        {episodes.map((ep) => (
          <div key={ep.id} className="bg-white p-4 mb-4 rounded shadow">
            <h3 className="font-semibold">{ep.topic}</h3>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {ep.script}
            </p>
            <audio
              controls
              className="w-full"
              src={`${ApplicationConfig.AUDIO_URL}/${ep.audio_file}`}
            ></audio>
          </div>
        ))}
      </div>
    </main>
  );
}
