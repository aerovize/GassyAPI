const calculateProfit = (mpg, milage, orderPrice, gasPrice) => {

    // Calculates profit for a order after money spent on gas
    // 1. The current gas price per gallon divided by the cars miles per gallon
    // 2. The result from step 1 multiplied by the total milage for the order.
    // 3. The result from step 2 gets subtracted from the original profit amount for the order
    // Final Calculations being:
    //      1. How much your gas costs per mile to complete the order
    //      2. The profit made after that gas amount is taken away.

    const pricePerMile = gasPrice / mpg;
    const orderGasPrice = pricePerMile * milage;
    const profit = orderPrice - orderGasPrice;
    //const quarterlyTarget = hourlyTarget / 4;
    const data = {
        pricePerMile,
        profit,
    };

    return data;
};

module.exports = {
    calculateProfit,
};
