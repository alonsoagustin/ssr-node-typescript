import Router from "express";
import * as productsController from "../controllers/productsController";

const router = Router();

router.get("/", productsController.getProducts);

router.get("/new", productsController.getNewProduct);
router.post("/new", productsController.postNewProduct);

router.get("/update/:productId", productsController.getUpdateProduct);
router.post("/update/:productId", productsController.postUpdateProduct);

router.get("/:productId", productsController.getProductDetails);

router.get("/delete/:productId", productsController.deleteProduct);

export default router;
