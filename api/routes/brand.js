const express = require("express");
const Product = require("../models/ProductsModel");
const brandRoute = express.Router();
const product = require("../models/ProductsModel");

brandRoute.get("/", async (req, res) => {
  Product.findAll({
    attributes: ["brand"],
    group: ["brand"],
  }).then((brand) => {
    res.status(200).send(brand);
  });
});

module.exports = brandRoute;
