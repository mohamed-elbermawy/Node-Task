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
    }

    let cart = new Cart();
    cart.productList.push({
      productId: data.productID,
      quantityToBuy: data.qty,
    });
    const result = await cart.save();

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
