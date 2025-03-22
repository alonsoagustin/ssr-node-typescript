import dotenv from "dotenv";

dotenv.config({ path: "./env/dev.env" });

export const { HOST, PORT, URI, APPNAME, CONTACT } = process.env;

if (!HOST || !PORT || !URI || !APPNAME || !CONTACT) {
  throw new Error(
    "Missing environment variable. Please check your .env file and ensure all required variables are defined."
  );
}
