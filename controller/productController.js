const productService = require("../service/productService");

// get Product by id
module.exports.getProduct = async (req, res) => {
  let response = {};
  try {
    const productData = await productService.getProduct(req.params);
    if (productData.notFound) {
      response.status = 404;
      response.massage = productData.notFound;
    } else if (productData.internal) {
      response.status = 500;
      response.massage = "Internal Server Error";
      console.log(productData.internal);
    } else {
      response.status = 200;
      response.massage = "Success";
      response.body = productData;
    }
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.massage = "Some thing went Wrong";
    res.status(500).send(response);
  }
};

// add Product
module.exports.addProduct = async (req, res) => {
  let response = {};
  try {
    const productData = await productService.addProduct(req.body);
    if (productData.internal) {
      response.status = 500;
      response.massage = "Internal Server Error";
      console.log(productData.internal);
    } else {
      response.status = 200;
      response.massage = "Success";
      response.body = productData;
    }
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.massage = "Some thing went Wrong";
    res.status(500).send(response);
  }
};
