// // just studied how tp get more than 100 markets
// //soo i used offset for it
// // it was a bit difficult

const axios = require("axios");
const Market = require("../models/markets");


let isSyncing = false;


async function syncMarkets() {
    if (isSyncing) return;
    isSyncing = true;

    try {

        let cursor = "";
        let totalSynced = 0;

        while (true) {
            const response = await axios.get(
                `https://clob.polymarket.com/markets?next_cursor=${cursor}`
            );

            const markets = response.data.data;
            
            cursor = response.data.next_cursor;

            if (!markets || markets.length === 0) break;

            for (const market of markets) {
                try {
                    const prices = JSON.parse(market.outcomePrices);

                    await Market.findOneAndUpdate( 
                        {  polymarketId: market.condition_id },
                        {
                            polymarketId: market.condition_id,

                            question: market.question,
                            image: market.image,
                            polymarketYesPrice: Number(prices[0]),
                            polymarketNoPrice: Number(prices[1]),
                            volume: market.volumeNum,
                            liquidity: market.liquidityNum,
                            active: market.active,
                            closed: market.closed,
                            endDate: market.end_date_iso
                        },
                        { upsert: true }
                    );
                } catch(e) { continue; }
            }

            totalSynced  += markets.length;
            console.log("total so far:", totalSynced, "cursor:", cursor);

            if (!cursor || cursor === "LTE=") break;

            await new Promise(r => setTimeout(r, 200));
        }

        console.log("markets synced woohooo");

    }  catch(err) {
        console.log(err.message);
    }

    isSyncing =  false;
}

module.exports = syncMarkets