const Product = require("../models/productModel");
// get product by id
module.exports.getProduct = async ({ id }) => {
  let error = {};
  try {
    let product = await Product.findById(id);
    if (!product) {
      error.notFound = "Product Not Found";
      return error;
    }
    return product;
  } catch (err) {
    error.internal = err;
    return error;
  }
};

// add product
module.exports.addProduct = async (data) => {
  let error = {};
  try {
    const product = new Product(data);
    const result = await product.save();
    if (!result) {
      error.internal = "Internal Server error";
      return error;
    }
    return result;
  } catch (err) {
    error.internal = err;
    return error;
  }
};
