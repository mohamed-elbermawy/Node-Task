const Joi = require("joi");

const cartValidation = (data) => {
  const cartSchema = Joi.object({
    productList: Joi.array().items({
      productId: Joi.string().required(),
      quantityToBuy: Joi.number().required(),
    }),
  }).unknown();
  return cartSchema.validate(data);
};

module.exports = {
  cartValidation,
};
