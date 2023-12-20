import express from "express";
const router = express.Router();

import {
  getAllProducts,
  createNewProduct,
  deleteProduct,
  getProductById,
  updateAProduct,
} from "../controllers/Prod_Con.js";

router.route("/allPro").get(getAllProducts);
router.route("/singlePro/:_id").get(getProductById);
router.route("/newPro").post(createNewProduct);
router.route("/updatePro/:_id").put(updateAProduct);
router.route("/deletePro/:_id").delete(deleteProduct);

export default router;
