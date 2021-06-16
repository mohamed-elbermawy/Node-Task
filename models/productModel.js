const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: String,
    image: String,
    price: Number,
    discount: Number,
    freeReturns: Boolean,
    freeDelivery: Number,
    details: String,
    sizes: [{ size: String }],
    qty: Number,
    itemNo: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
