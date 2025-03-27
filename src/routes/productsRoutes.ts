import Router from "express";
import * as productsController from "../controllers/productsController";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/new", productsController.getNewProduct);

router.get("/update/:productId", productsController.getUpdateProduct);
router.post("/update/:productId", productsController.postUpdateProduct);

export default router;
