// basic imports :)

require("dotenv").config();
const express = require("express")
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const syncMarkets = require("./scripts/syncMarkets");

const cron = require("node-cron");

connectDB();

// i didnt write the lines 15, 16, 17 (took some help in just these)

cron.schedule("*/1 * * * *", async () => {
    console.log("Auto-syncing...");
    await syncMarkets();
});


const app = express();
app.use("/api/auth", authRoutes);
app.use("/api/markets", marketRoutes);

app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
        res.send("Lopymarket API workin");

});

//this is what seniors do hehehe
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
