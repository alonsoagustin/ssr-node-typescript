import dotenv from "dotenv";

dotenv.config({ path: "./env/dev.env" });

export const { PORT, URI, APP_NAME, CONTACT, SECRET_SESSION } = process.env;

if (!PORT || !URI || !APP_NAME || !CONTACT || !SECRET_SESSION) {
  throw new Error(
    "Missing environment variable. Please check your .env file and ensure all required variables are defined."
  );
}
