import { Product_col } from "../models/ProSchema.js";

// all products
export const getAllProducts = async (request, responce, nexk) => {
  try {
    const allProducts = await Product_col.find();
    if (!allProducts) {
      throw new Error("products not found");
    }
    responce.json({
      data: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

//single product
export const getProductById = async (request, responce, next) => {
  try {
    const { id: pro_id } = request.params;
    const get_A_Prod = await Product_col.findById(pro_id);
    if (get_A_Prod) {
      responce.json({
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
export const createNewProduct = async (request, responce, next) => {
  try {
    const newProd = request.body;
    const result = await Product_col.create(newProd);
    responce.json({
      message: "data added",
      data: result,
    });
  } catch (error) {
    // responce.json({ error });
    next(error);
  }
};

// update product
export const updateAProduct = async (request, responce, next) => {
  try {
    const pro_id = request.params.id;
    const updatedProd = request.body;
    const matchPro = await Product_col.findByIdAndUpdate(pro_id, updatedProd);
    responce.json({
      data: matchPro,
    });
  } catch (error) {
    next(error);
  }
};

//delete a product
export const deleteProduct = async (request, responce, next) => {
  try {
    const pro_id = request.params.id;
    const matchPro = await Product_col.findByIdAndDelete(pro_id);
    responce.json({
      data: matchPro,
    });
  } catch (error) {
    next(error);
  }
};
