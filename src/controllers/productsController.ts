import { Request, Response } from "express";

export const getProducts = (_req: Request, res: Response) => {
  res.send("ProductsPage");
};
