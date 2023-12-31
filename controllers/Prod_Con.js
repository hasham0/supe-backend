import { Product_col } from "../models/Pro_Schema.js";

// all products
export const getAllProducts = async (request, response, next) => {
  try {
    const allProducts = await Product_col.find();
    if (!allProducts) {
      throw new Error("products not found");
    }
    response.json({
      data: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

//single product
export const getProductById = async (request, response, next) => {
  try {
    const { _id: pro_id } = request.params;
    const get_A_Prod = await Product_col.findById(pro_id);
    if (get_A_Prod) {
      response.json({
        data: get_A_Prod,
      });
    } else {
      next("product not found");
    }
  } catch (error) {
    next(error);
  }
};

// add signle product
export const createNewProduct = async (request, response, next) => {
  try {
    const newProd = request.body;
    if (!newProd) {
      next("empty body");
    }
    const result = await Product_col.create(newProd);

    response.json({
      message: "data added",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// update product
export const updateAProduct = async (request, response, next) => {
  try {
    const { _id: pro_id } = request.params;
    if (!pro_id) {
      next("product not found");
    }
    const updatedProd = request.body;
    const matchPro = await Product_col.findByIdAndUpdate(pro_id, updatedProd, {
      new: true,
    });
    response.json({
      data: matchPro,
    });
  } catch (error) {
    next(error);
  }
};

//delete a product
export const deleteProduct = async (request, response, next) => {
  try {
    const { _id: pro_id } = request.params;
    if (!pro_id) {
      next("product not found");
    }
    const matchPro = await Product_col.findByIdAndDelete(pro_id);
    response.json({
      data: matchPro,
    });
  } catch (error) {
    next(error);
  }
};
