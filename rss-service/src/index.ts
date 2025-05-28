import express, { Request, Response } from "express";
import RSS from "rss";
import { MongoClient } from "mongodb";
import { ApplicationConfig } from "./applicationConfig.ts";

const app = express();
const client = new MongoClient(ApplicationConfig.MONGO_URL);

app.get("/rss", async (req: Request, res: Response) => {
  try {
    await client.connect();
    const db = client.db("podcast_db");
    const episodes = await db
      .collection("episodes")
      .find()
      .sort({ _id: -1 })
      .toArray();

    const feed = new RSS({
      title: "AI Podcast Feed",
      description: "Auto-generated podcasts from AI",
      feed_url: `${ApplicationConfig.FRONTEND_URL}/episodes`,
      site_url: ApplicationConfig.FRONTEND_URL,
      language: "en",
      custom_namespaces: {
        itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd",
      },
      custom_elements: [{ "itunes:email": "madan.sharma281572@gmail.com" }],
    });

    episodes.forEach((ep) => {
      feed.item({
        title: ep.topic,
        description: ep.script,
        url: `${ApplicationConfig.FRONTEND_URL}/episodes/${ep._id}`,
        date: ep._id.getTimestamp(),
        enclosure: {
          url: `${ApplicationConfig.API_URL}/audio/${ep.audio_file}`,
          type: "audio/mpeg",
        },
      });
    });

    const xml = feed.xml({ indent: true });
    res.type("application/xml");
    res.send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(ApplicationConfig.PORT, () =>
  console.log(`RSS feed running on port ${ApplicationConfig.PORT}`)
);
