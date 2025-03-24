import path from "node:path";
import { Request, Response } from "express";

export const getProducts = (_req: Request, res: Response) => {
  res.locals.page = "../pages/products";
  res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
};

export const getNewProduct = (_req: Request, res: Response) => {
  res.locals.page = "../pages/newProduct";
  res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
};
