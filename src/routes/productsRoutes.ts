import Router from "express";
import * as productsController from "../controllers/productsController";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/new", productsController.getNewProduct);

router.get("/update/:productId", productsController.getUpdateProduct);
router.post("/update/:productId", productsController.postUpdateProduct);

router.get("/:productId", productsController.getProductDetails);
router.delete("/:productId", productsController.deleteProduct);

export default router;
