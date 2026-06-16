// basic imports :)

require("dotenv").config();
const express = require("express")
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");

connectDB();

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
