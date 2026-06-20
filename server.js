// basic imports :)

require("dotenv").config();
const express = require("express")
const cors = require("cors");
const cron = require("node-cron");

const connectDB = require("./config/db");
const tradeRoutes = require("./routes/tradeRoutes");

const syncMarkets = require("./scripts/syncMarkets");

const userRoutes = require("./routes/userRoutes");
const marketRoutes = require("./routes/marketRoutes");

connectDB();


// i didnt write the following 3 lines  (took some help in just these)

cron.schedule("*/1 * * * *", async () => {
    console.log("Auto-syncing...");
    await syncMarkets();
});
const app = express();
app.use(cors());

app.use(express.json());


app.use("/api/trade", tradeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/markets", marketRoutes);



app.get("/", (req,res) =>{
        res.send("Lopymarket API workin");

});

//this is what seniors do hehehe
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
