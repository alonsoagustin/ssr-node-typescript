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
  // get the tags from the Product schema
  const tags = Product.schema.path("tags").options.enum;

  // render the newProduct page with the tags
  res.locals.page = "../pages/newProduct";
  res.locals.tags = tags;
  res.render(path.join(__dirname, "../views/layout/base.ejs"));
};

export const getUpdateProduct = async (req: Request, res: Response) => {
  try {
    // Get the product id from the request parameters
    const { productId } = req.params;

    // Find the product in the database
    const product = await Product.findById(productId);

    // Get the tags from the Product schema
    const tags = Product.schema.path("tags").options.enum;

    // If the product exists, render the updateProduct page with the product data
    res.locals.page = "../pages/updateProduct";
    res.locals.product = product;
    res.locals.tags = tags;
    res.status(200).render(path.join(__dirname, "../views/layout/base.ejs"));
  } catch (error) {
    // If the product does not exist, render the notFound page
    res.locals.page = "../pages/notFound";
    res.status(404).render(path.join(__dirname, "../views/layout/base.ejs"));
  }
};

export const postUpdateProduct = async (req: Request, res: Response) => {
  try {
    // get the product id from the request parameters
    const { productId } = req.params;

    // get the product data from the request body
    const { name, description, price, quantity, image, tags } = req.body;

    // find and update the product in the database
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        quantity,
        image,
        tags,
      },
      { new: true, runValidators: true }
    );

    // if the product does not exist, render the notFound page
    if (!updatedProduct) {
      res.locals.page = "../pages/notFound";
      res.status(404).render(path.join(__dirname, "../views/layout/base.ejs"));
      return;
    }

    // redirect to products page
    res.redirect("/products");
  } catch (error) {
    // render server error page
    res.locals.page = "../pages/serverError";
    res.status(500).render(path.join(__dirname, "../viws/layout/base.ejs"));
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    // get the product id from the request parameters
    const { productId } = req.params;

    // find the product in the database
    const product = await Product.findById(productId);

    // if the product does not exist, render the notFound page
    if (!product) {
      res.locals.page = "../pages/notFound";
      res.status(404).render(path.join(__dirname, "../view/layout/base.ejs"));
      return;
    }
    //render the productDetails page with the product data
    res.locals.product = product;
    res.render(path.join(__dirname, "../views/pages/productDetails"));
  } catch (error) {
    // if there is an error, render the serverError page
    res.locals.page = "../pages/serverError";
    res.status(500).render(path.join(__dirname, "../views/layout/base.ejs"));
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // get the product id from the request parametrs
    const { productId } = req.params;

    // find and delete the product in the database
    const deletedProduct = await Product.findByIdAndDelete(productId);

    // if the product does not exist, render the notFound page
    if (!deletedProduct) {
      res.locals.page = "../pages/notFound";
      res.status(404).render(path.join(__dirname, "../views/layout/base.ejs"));
      return;
    }

    // redirect to products page
    res.redirect("/products");
  } catch (error) {
    // if there is an error, render the serverError page
    res.locals.page = "../pages/serverError";
    res.status(500).render(path.join(__dirname, "../views/layout/base.ejs"));
  }
};
