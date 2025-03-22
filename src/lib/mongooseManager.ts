import mongoose from "mongoose";
import debug from "debug";
import { URI } from "../config";

const log = debug("app:mongoose");

export const connect = async () => {
  if (!URI) throw new Error("Missing URI environment variable.");
  try {
    log("Connecting to MongoDB...");
    await mongoose.connect(URI);
    log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const disconnect = async () => {
  try {
    log("Disconnecting from MongoDB...");
    await mongoose.disconnect();
    log("Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};
