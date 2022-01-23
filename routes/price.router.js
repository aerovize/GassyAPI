const express = require("express");
const {
    getAllPrices,
    calculate,
    getAllGasData,
} = require("./price.controller");

const priceRouter = express.Router();

// GET /all/43055
priceRouter.get("/all/:zipcode", getAllGasData);

// GET /prices/43055
priceRouter.get("/prices/:zipcode", getAllPrices);

// POST /calc/
priceRouter.post("/calc/", calculate);

module.exports = priceRouter;
