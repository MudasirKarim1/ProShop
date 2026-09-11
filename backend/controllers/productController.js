import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

const getProductById = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const product = await Product.findById(id);

  if (product) {
    return res.send(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getProducts, getProductById };
