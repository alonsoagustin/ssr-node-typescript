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

const renderPage = (
  res: Response,
  page: string,
  email?: string,
  error?: string
) => {
  res.locals.page = `../pages/${page}`;
  res.locals.email = email;
  res.locals.error = error;
  res.render(path.join(__dirname, "../views/layout/base.ejs"));
};

export const getLogin = (_req: Request, res: Response) => {
  res.status(200);
  renderPage(res, "login");
};

export const postLogin = async (req: Request, res: Response) => {
  // Get email and password from the request body
  const { email, password } = req.body;

  // If email and password are not provided we render the login page with an error message
  if (!email || !password) {
    res.status(400);
    renderPage(res, "login", email, "Please provide an email and password");
    return;
  }

  // Try to find a user with the provided email
  const user = await User.findOne({ email });

  // if user does not exist or password is incorrect we render the login page with an error message
  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    renderPage(res, "login", email, "Invalid email or password");
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
  res.status(200);
  renderPage(res, "signup");
};

export const postSignup = async (req: Request, res: Response) => {
  // Get email, password and passwordConfirmation from the request body
  const { email, password, passwordConfirmation } = req.body;

  // If email, password and passwordConfirmation are not provided we render the signup page with an error message
  if (!email || !password || !passwordConfirmation) {
    res.status(400);
    renderPage(res, "signup", email, "Please complete all fields to sign up.");
    return;
  }

  // if password and passwordConfirmation do not match we render the signup page with an error message
  if (password !== passwordConfirmation) {
    res.status(400);
    renderPage(res, "signup", email, "Passwords do not match.");
    return;
  }

  // if email is already registered we render the signup page with an error message
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    res.status(400);
    renderPage(res, "signup", email, "Email is already registered.");
    return;
  }

  // hash the password
  const hashedPassword = await User.hashPassword(password);

  // create a new user
  const user = await User.insertOne({ email, password: hashedPassword });

  // if user is created successfully we set the userId in the session and redirect t the products page
  req.session.userId = user.id;
  res.redirect("/products");
};
