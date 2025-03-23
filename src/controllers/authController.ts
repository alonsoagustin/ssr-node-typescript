import { Request, Response } from "express";

const renderLogin = (
  res: Response,
  email: string | undefined = undefined,
  error: string | undefined = undefined
) => {
  res.locals.page = "../pages/login";
  res.locals.email = email;
  res.locals.error = error;
  res.render("layout/base.ejs");
};

export const getLogin = (_req: Request, res: Response) => {
  res.status(200);
  renderLogin(res);
};
