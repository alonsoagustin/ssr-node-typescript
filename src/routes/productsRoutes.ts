import Router from "express";
import * as productsController from "../controllers/productsController";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/new", productsController.getNewProduct);

export default router;
