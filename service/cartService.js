const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// add to cart
module.exports.addToCart = async (data) => {
  let error = {};
  try {
    const checkProduct = await Product.findById(data.productID);
    if (!checkProduct) {
      error.notFound = "this product doesn't exists";
      return error;
    }
    if (checkProduct.qty < data.qty) {
      error.available = "No available stock";
      return error;
    } else {
      checkProduct.qty = checkProduct.qty - data.qty;
    }

    let cart = new Cart();
    cart.productList.push({
      productId: data.productID,
      quantityToBuy: data.qty,
    });
    const result = await cart.save();
    const updatedProduct = await Product.updateOne(
      { _id: data.productID },
      checkProduct
    );
    if (!result) {
      error.internal = "Internal Server error";
      return error;
    }
    if (!updatedProduct) {
      error.internal = "Internal Server error";
      return error;
    }
    return result;
  } catch (err) {
    error.internal = err;
    return error;
  }
};
