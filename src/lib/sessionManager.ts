import session from "express-session";
import { Request, Response, NextFunction } from "express";
import { APPNAME, CONTACT, SECRET_SESSION } from "../config";

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

export const setLocalsSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.app = APPNAME;
  res.locals.contact = CONTACT;
  res.locals.session = req.session;
  next();
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    res.redirect("/auth/login");
    return;
  }
  next();
};
