const express = require("express")

const router = express.Router();

const {getMarkets,getMarketById, searchMarkets} = require("../controllers/marketController")

router.get("/search", searchMarkets);
router.get("/:id", getMarketById);
router.get("/", getMarkets);

module.exports = router;