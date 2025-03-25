import path from "node:path";
import { Request, Response } from "express";
import Product from "../model/Product";

export const getProducts = async (req: Request, res: Response) => {
  // get all products of the user from the database
  const products = await Product.find({ owner: req.session.userId });

  // if there are no products, we render the products page with a error message
  if (products.length < 1) {
    res.locals.products = [];
    res.locals.error = "You don't have any products yet.";
    res.locals.page = "../pages/products";
    res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
    return;
  }

  // if there are products, we render the products page with the products
  res.locals.products = products;
  res.locals.page = "../pages/products";
  res.locals.error = "";
  res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
};

export const getNewProduct = (_req: Request, res: Response) => {
  res.locals.page = "../pages/newProduct";
  res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
};
