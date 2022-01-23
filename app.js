const express = require("express");
const cors = require("cors");
const priceRouter = require("./routes/price.router");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use(priceRouter);

module.exports = app;
