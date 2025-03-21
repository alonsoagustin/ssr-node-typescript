import dotenv from "dotenv";

dotenv.config({ path: "./env/dev.env" });

export const { HOST, PORT } = process.env;

if (!HOST || !PORT) {
  throw new Error(
    "Missing environment variable. Please check your .env file and ensure all required variables are defined."
  );
}
