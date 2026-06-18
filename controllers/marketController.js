const Market = require("../models/markets")

const getMarkets = async (req,res) => {

        const markets = await Market.find();

        res.json(markets);

};

const getMarketById = async (req,res) => {

     const market = await Market.findById(req.params.id);
    
    if (!market) {
        return res.status(404).json({ message: "market not found brotha" });

    }
            res.json(market);
    
    }


    // found this typa code in regex docs
    const searchMarkets = async (req,res) => {

        const {q} = req.query;

                if (!q) {
            return res.status(400).json({ message: "search term required" });
        }

    const markets = await Market.find({
        question: { $regex: q, $options: "i" }
    }).limit(20);

    res.json(markets);
};

module.exports = { getMarkets, getMarketById, searchMarkets };
