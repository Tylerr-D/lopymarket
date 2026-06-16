const Market = require("../models/markets")

const getMarkets = async (req,res) => {

        const markets = await Market.find();

        res.json(markets);

}

module.exports = {
    getMarkets
}