const cheerio = require("cheerio");
const axios = require("axios");
const URL = process.env.GAS_URL;
const QUERY = process.env.GAS_URL_QUERY;

const getPrices = async (zipcode) => {
    const url = `${URL}?search=${zipcode}&${QUERY}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:96.0) Gecko/20100101 Firefox/96.0",
            },
        });
        return await response.data;
    } catch (error) {
        console.error(error);
    }
};

// Makes  sure data is up to date
const getPostedTime = (text) => {
    const time = text.split(" ");
    if (time[1] !== "day" && parseInt(time[0]) < 12) {
        return true;
    }
};

// Returns list of local gas stations with info and price.
const scrapeData = async (zipcode) => {
    const data = await getPrices(zipcode);
    let finalData = [];
    if (data) {
        let name, address, price, postedTime;

        const $ = cheerio.load(data);

        const stations = $(
            ".GenericStationListItem-module__stationListItem___3Jmn4"
        );

        for (let i = 0; i < stations.length; i++) {
            name = $(stations[i])
                .find(".StationDisplay-module__stationNameHeader___1A2q8 a")
                .text();

            address = $(stations[i])
                .find(".StationDisplay-module__address___2_c7v")
                .text();

            price = $(stations[i])
                .find(".StationDisplayPrice-module__price___3rARL")
                .text();

            postedTime = $(stations[i])
                .find(".ReportedBy-module__postedTime___J5H9Z")
                .text();
            let good = getPostedTime(postedTime);

            if (good) {
                finalData.push({ name, address, price });
            }
        }

        
        return finalData;
        //finalData = {
        //     "name": "We Got Gas",
        //     "address": "100 Main St Newark, OH",
        //     "price": "$2.85"
        //   }
    }
};
// Calculates Average gas price in area
const prices = async (zipcode) => {
    const scraped = await scrapeData(zipcode);
    if (scraped) {
        const cleaned = scraped.map((obj) => {
            return parseFloat(obj.price.replace("$", ""));
        });
        let avg = cleaned.reduce((a, b) => a + b);
        avg /= cleaned.length;
        console.log(avg);

        return {
            averagePrice: avg,
        };
        //TODO:
        // return low, avg, and high
        // add comments
    }
};

module.exports = {
    scrapeData,
    prices,
};
