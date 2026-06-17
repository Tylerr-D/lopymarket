const express = require("express");
const router = express.Router();

const { buy, sell,  getPortfolio } = require("../controllers/tradeController");

router.post("/buy", buy);
router.post("/sell", sell);
router.get("/portfolio/:userId", getPortfolio);

module.exports = router;