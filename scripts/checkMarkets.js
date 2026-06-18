//checkin if i could bring the data

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("../config/db");
const Market = require("../models/markets");

async function check() {
    await connectDB();

    const markets = await Market.find().limit(500);

    console.log(markets);
}

check();