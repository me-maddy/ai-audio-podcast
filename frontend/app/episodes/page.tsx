"use client";

import { useEffect, useState } from "react";
import { Episode } from "../page";
import ApplicationConfig from "../appConfig";
import Link from "next/link";

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    fetch(`${ApplicationConfig.BACKEND_URI}/episodes`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        <Link
          href="/"
          className="text-xl text-blue-400 hover:text-blue-600 hover:-translate-x-1 transition-all duration-200 ease-linear border-blue-400 border border-solid rounded-md px-4 py-2 hover:bg-blue-50 inline-block"
        >
          Go Back
        </Link>{" "}
        📚 Previous Episodes
      </h1>
      <ul className="space-y-4">
        {episodes.map((ep) => (
          <li key={ep.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{ep.topic}</h2>
            <audio
              controls
              className="w-full"
              src={`https://ai-audio-podcast.onrender.com/audio/${ep.audio_file}`}
            ></audio>
            <p className="mt-2 text-sm text-gray-600">{ep.script}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
