const cartService = require("../service/cartService");

// add to cart
module.exports.addToCart = async (req, res) => {
  let response = {};
  try {
    const cartData = await cartService.addToCart(req.body);
    if (cartData.internal) {
      response.status = 500;
      response.massage = cartData.internal;
      console.log(cartData.internal);
    } else if (cartData.notFound) {
      response.status = 404;
      response.massage = cartData.notFound;
    } else if (cartData.available) {
      response.status = 404;
      response.massage = cartData.available;
    } else {
      response.status = 200;
      response.massage = "Success";
      response.body = cartData;
    }
    res.status(response.status).send(response);
  } catch (error) {
    console.log(error);
    response.status = 500;
    response.massage = "Some thing went Wrong";
    res.status(500).send(response);
  }
};
