const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();


const Market = require("../models/markets");

//THE api

async function syncMarkets(){
    try{

    const response = await axios.get(
"https://gamma-api.polymarket.com/markets?limit=100"
    );



    //importing stuff from api

    //number of markets
const markets = response.data;
console.log("Raw response:", response.data);


        console.log(`Fetched ${markets.length} markets`);

        for (const market of markets ){

            console.log(market.outcomePrices);

            const prices  = JSON.parse(market.outcomePrices);

            await Market.findOneAndUpdate(
                {
                    polymarketId : market.id
                },
                {
                polymarketId: market.id,
                question:market.question,
                image:market.image,

                polymarketYesPrice: Number(prices[0]),
                polymarketNoPrice:Number(prices[1]),

            volume: market.volumeNum,
            liquidity: market.liquidityNum,

            active: market.active,
            closed: market.closed,

            endDate: market.endDate
                },
{
    upsert: true,
    returnDocument: "after"
}
            )

        }

        console.log("market synced")

        console.log(response.data.length);
console.log(response.request.res.responseUrl);
}

catch (err){
            console.log(err.message);
}
}

module.exports = syncMarkets;

