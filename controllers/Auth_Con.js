import bcrypt from "bcryptjs";
import { Users_col } from "../models/Users_Schema.js";

// get all users
export const allUser = async (request, response, next) => {
  try {
    const allUsers = await Users_col.find({});
    response.json(allUsers);
  } catch (error) {
    next(error);
  }
};

// register new user
export const registerUser = async (request, response, next) => {
  try {
    let newUser = request.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const userMade = await Users_col.create(newUser);
    response.json(userMade);
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
    response.json(`user matched => ${authUser}`);
  } catch (error) {
    next(error);
  }
};

// update user
export const updateUser = (request, response, next) => {
  try {
    const newUser = request.body;
    response.json(newUser);
  } catch (error) {
    next(error);
  }
};

// delete user
export const deleteUser = (request, response, next) => {
  try {
    const newUser = request.body;
    response.json(newUser);
  } catch (error) {
    next(error);
  }
};
