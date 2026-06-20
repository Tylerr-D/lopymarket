const express = require("express");
const router = express.Router();

const { buy, sell,  getPortfolio , getPosition} = require("../controllers/tradeController");

router.post("/buy", buy);
router.post("/sell", sell);
router.get("/portfolio/:userId", getPortfolio);
router.get("/position/:userId/:marketId",getPosition);

module.exports = router;