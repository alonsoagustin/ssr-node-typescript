import http from "node:http";
import debug from "debug";
import app from "./app";
import { PORT } from "./config";

const log = debug("app:server");

const startServer = () => {
  try {
    const server = http.createServer(app);

    server.on("error", (error: Error) => {
      log("Server error: ", error);
      throw error;
    });

    server.listen(PORT, () => {
      log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    process.exit(1);
  }
};

startServer();
