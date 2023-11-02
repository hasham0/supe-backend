import express from "express";
const router = express.Router();
import { isAuthentication, isAuthRole } from "../middlewares/Authen.js";
import {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  allUser,
  userByID,
} from "../controllers/Auth_Con.js";

// all user
router.route("/allUsers").get(isAuthentication, allUser);

// signle user
router.route("/signleUser/:_id").get(isAuthentication, userByID);

// register new user
router.route("/register").post(isAuthentication, registerUser);

// login user
router.route("/login").post(isAuthentication, loginUser);

// update user
router.route("/updateUser/:_id").put(isAuthentication, updateUser);

// delete user
router
  .route("/deleteUser/:_id")
  .delete(isAuthentication, isAuthRole("admin", "teacher"), deleteUser);

export default router;
