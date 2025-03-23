import session from "express-session";
import { SECRET_SESSION } from "../config";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

export const createSession = session({
  name: "nodeapp-session", // Name of the cookie
  secret: String(SECRET_SESSION), // Secret used to sign the session ID cookie
  resave: false, // Forces the session to be saved back to the session store
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2, // The cookie will expire in 2 days
  },
});
