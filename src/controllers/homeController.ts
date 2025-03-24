import { Request, Response } from "express";

export const getIndex = (_req: Request, res: Response) => {
  res.redirect("/products");
};
