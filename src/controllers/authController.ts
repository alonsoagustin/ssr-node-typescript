import { Request, Response } from "express";
import User from "../model/User";
import path from "node:path";

const renderLogin = (
  res: Response,
  email: string | undefined = undefined,
  error: string | undefined = undefined
) => {
  res.locals.page = "../pages/login";
  res.locals.email = email;
  res.locals.error = error;
  res.render(path.join(__dirname, "../views/layout/base.ejs"));
};

export const getLogin = (_req: Request, res: Response) => {
  res.status(200);
  renderLogin(res);
};

export const postLogin = async (req: Request, res: Response) => {
  // Get email and password from the request body
  const { email, password } = req.body;

  // If email and password are not provided we render the login page with an error message
  if (!email || !password) {
    res.status(400);
    renderLogin(res, email, "Please provide an email and password");
    return;
  }

  // Try to find a user with the provided email
  const user = await User.findOne({ email });

  // if user does not exist or password is incorrect we render the login page with an error message
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    renderLogin(res, email, "Invalid email or password");
    return;
  }

  // if user exists and password is correct we set the userId in the session and redirect to the products page
  req.session.userId = user.id;

  res.redirect("/products");
};

export const getLogout = (req: Request, res: Response) => {
  req.session.userId = undefined;
  res.redirect("/auth/login");
};

export const getSignup = (_req: Request, res: Response) => {
  res.locals.page = "../pages/signup";
  res.locals.email = "";
  res.locals.error = "";
  res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
};
