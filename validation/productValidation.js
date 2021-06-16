const Joi = require("joi");

const productValidation = (data) => {
  const productSchema = Joi.object({
    productName: Joi.string().min(3).max(100).required(),

    image: Joi.string().required(),

    price: Joi.number().required(),

    discount: Joi.number(),

    freeReturns: Joi.boolean().required(),

    freeDelivery: Joi.number(),

    details: Joi.string().min(20).required(),

    qty: Joi.number().required(),

    itemNo: Joi.string().required(),

    sizes: Joi.array().items(
      Joi.object({
        size: Joi.string().required(),
      })
    ),
  }).unknown();
  return productSchema.validate(data);
};

module.exports = {
  productValidation,
};
