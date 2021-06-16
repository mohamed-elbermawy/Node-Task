const express = require("express");
const mongoose = require("mongoose");

const cartController = require("../../controller/cartController");
const cartValidation = require("../../validation/cartValidation");

const router = express.Router();

// middleware to validate cart data
router.post(["/"], (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.productID)) {
    return res.status(400).json({ massage: "Product ID not valid" });
  }
  let list = {};
  let data = [];
  data.push({
    productId: req.body.productID,
    quantityToBuy: req.body.qty,
  });
  list.productList = data;
  const { error } = cartValidation.cartValidation(list);
  if (error) {
    return res.status(400).json({ massage: error.details[0].message });
  } else {
    next();
  }
});

// add to cart
router.post("/", cartController.addToCart);

module.exports = router;
