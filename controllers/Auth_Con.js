import bcrypt from "bcryptjs";
import { Users_col } from "../models/Users_Schema.js";
import Jwt from "jsonwebtoken";
import "dotenv";

// get all users
export const allUser = async (request, response, next) => {
  try {
    const allUsers = await Users_col.find({});
    response.json(allUsers);
  } catch (error) {
    next(error);
  }
};

// get user by id
export const userByID = async (request, response, next) => {
  try {
    const { _id: userId } = request.params;
    if (userId) {
      next(new Error("id is required"));
    }
    const foundUser = await Users_col.findById(userId);
    if (!foundUser) {
      next(new Error("user not found"));
    }
    response.json(foundUser);
  } catch (error) {
    next(error);
  }
};

// register new user
export const registerUser = async (request, response, next) => {
  try {
    let newUser = request.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const createdUser = await Users_col.create(newUser);
    response.json(createdUser);
  } catch (error) {
    next(error);
  }
};

// login  user
export const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    if (!email) {
      next(new Error("email not found"));
    }
    if (!password) {
      next(new Error("password not found"));
    }
    const foundUser = await Users_col.findOne({ email });
    if (!foundUser) {
      next(new Error("user not found"));
    }
    const authUser = await bcrypt.compare(password, foundUser.password);
    if (!authUser) {
      next(new Error("password not matched"));
    }

    // authentication and authorization
    const token = Jwt.sign({ foundUser: foundUser }, process.env.SECRATE_KEY);
    response
      .cookie("auth_Token", token, {
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
        secure: false,
      })
      .json({ message: `user matched => ${authUser}` });
  } catch (error) {
    next(error);
  }
};

// update user
export const updateUser = async (request, response, next) => {
  try {
    const { _id: userId } = request.params;
    const updateData = request.body;
    const foundUser = await Users_col.findById(userId);
    console.log(foundUser);
    response.json(foundUser);
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = async (request, response, next) => {
  try {
    const { _id } = request.params;
    const deleteUser = await Users_col.findByIdAndDelete(_id);
    response.json(deleteUser);
  } catch (error) {
    next(error);
  }
};
