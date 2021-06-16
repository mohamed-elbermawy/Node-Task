const express = require("express");
const mongoose = require("mongoose");

const productController = require("../../controller/productController");
const productValidation = require("../../validation/productValidation");

const router = express.Router();

// middleware to validate product data
router.post(["/"], (req, res, next) => {
  const { error } = productValidation.productValidation(req.body);
  if (error) {
    return res.status(400).json({ massage: error.details[0].message });
  } else {
    next();
  }
});

// middleware to validate product id
router.get(["/:id"], (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ massage: "Product ID not valid" });
  }
  next();
});

router.get("/:id", productController.getProduct);
router.post("/", productController.addProduct);

module.exports = router;
