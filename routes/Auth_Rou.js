import express from "express";
const router = express.Router();

import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  allUser,
} from "../controllers/Auth_Con.js";

router.route("/allUsers").get(allUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;
