const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const Market = require("../models/markets");

async function check() {
    await connectDB();

    const markets = await Market.find().limit(5);

    console.log(markets);
}

check();