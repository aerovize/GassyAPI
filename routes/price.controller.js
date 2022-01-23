const { scrapeData, prices } = require("../models/prices.model");
const { calculateProfit } = require("../models/calculate.model");

// GET /all/:zipcode (43056)
async function getAllGasData(req, res) {
    const zipcode = req.params.zipcode;

    if (!zipcode || zipcode.length != 5) {
        return res.status(400).json({
            error: "Invalid Zipcode",
        });
    }
    const gasData = await scrapeData(zipcode);
    if (gasData) {
        return res.status(200).json(gasData);
    }
}

// GET /prices/:zipcode
async function getAllPrices(req, res) {
    const zipcode = req.params.zipcode;

    if (!zipcode || zipcode.length != 5) {
        return res.status(400).json({
            error: "Invalid Zipcode",
        });
    }
    const avgPrice = await prices(zipcode);
    if (avgPrice) {
        return res.status(200).json(avgPrice);
    }
}

// POST /calc
function calculate(req, res) {
    const milage = req.body.milage; // Total price amount for order
    const mpg = req.body.mpg; // Estimated miles per gallon for users vehicle
    const orderPrice = req.body.orderPrice; // Total Order Price
    const gasPrice = req.body.gasPrice; // Gas Price per gallon
    //const hourlyTarget = 20;

    if (!milage || !mpg || !orderPrice || gasPrice) {
        return res.status(400).json({
            error: "Please enter all fields"
        })
    }

    return res
        .status(200)
        .json(calculateProfit(mpg, milage, orderPrice, gasPrice));
}

module.exports = {
    getAllGasData,
    getAllPrices,
    calculate,
};
