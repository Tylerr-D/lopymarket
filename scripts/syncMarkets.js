// just studied how tp get more than 100 markets
//soo i used offset for it
// it was a bit difficult

const axios = require("axios");
const Market = require("../models/markets");

async function syncMarkets() {
    try {
        let offset = 0;

        //loop for more markets
        while (true) {

            const response = await axios.get(
                `https://gamma-api.polymarket.com/markets?limit=100&offset=${offset}`
            );

            const markets = response.data;

            if (markets.length === 0) {
                break;
            }

            console.log(`got ${markets.length} markets`);

            for (const market of markets) {

                if (!market.outcomePrices) continue;
                const prices = JSON.parse(market.outcomePrices);

                await Market.findOneAndUpdate(
                    { polymarketId: market.id },
                    {
                     polymarketId: market.id,
                       question: market.question,
                     image: market.image,

                    polymarketYesPrice: Number(prices[0]),
                        polymarketNoPrice: Number(prices[1]),

                        volume: market.volumeNum,
                        liquidity: market.liquidityNum,

                        active: market.active,
                        closed: market.closed,

                        endDate: market.endDate
                    },
                    { upsert: true }
                )}

            offset += 100;
        }

        console.log("markets synced woohooo");

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = syncMarkets;