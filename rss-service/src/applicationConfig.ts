import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: resolve(__dirname, "../.env"),
});

const requiredEnvVars = ["PORT", "MONGO_URL"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

export const ApplicationConfig = {
  MONGO_URL: process.env.MONGO_URL as string,
  PORT: parseInt(process.env.PORT ?? "8080"),
  FRONTEND_URL: process.env.FRONTEND_URL ?? "",
  BACKEND_URL: process.env.BACKEND_URL ?? "",
  API_URL: process.env.API_URL ?? "",
};
