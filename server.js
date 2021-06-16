const express = require("express");
const productRouter = require("./routes/products/productRouter");
const cartRouter = require("./routes/carts/cartRouter");
require("./database/dbConnection");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use("/products", productRouter);
app.use("/carts", cartRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
