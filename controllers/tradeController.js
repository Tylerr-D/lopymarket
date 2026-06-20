// this took a lot of time

const User = require("../models/user");
const Market = require("../models/markets");
const Position = require("../models/Position");


const buy = async (req, res) => {

    const { userId, marketId, side, amount } = req.body;

    const spend = Number(amount);
    if (Number.isNaN(spend) || spend <= 0) {
      return res.status(400).json({ message: "Invalid amount; must be a positive number" });
    }

    const user = await User.findById(userId);
    const market = await Market.findById(marketId);

        if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!market) {
      return res.status(404).json({ message: "Market not found" });
    }
// getting the prices
        const price = side === "YES"
        ? market.polymarketYesPrice
        : market.polymarketNoPrice;

    const shares = spend / price;

    if (user.coins < spend) {
      return res.status(400).json({
        message: "Not enough coins"
      });
    }

        user.coins -= spend;

    let position = await Position.findOne({
  user: userId,
  market: marketId

    });

        if (!position) {
      position = new Position({
        user : userId,
       market:  marketId,
        yesShares: 0,
        noShares: 0,
        yesAvgPrice: 0,
        noAvgPrice: 0
      });
    }

        if (side === "YES") {
      const totalSpent = position.yesShares * position.yesAvgPrice + spend;

              position.yesShares += shares;

      position.yesAvgPrice = totalSpent / position.yesShares;
        }
        else {
                  const totalSpent = position.noShares * position.noAvgPrice + spend;

              position.noShares += shares;

      position.noAvgPrice = totalSpent / position.noShares;

        }

            await user.save();
    await position.save();

        res.json({
      success: true,
      sharesBought: shares,
      price,
      coinsLeft: user.coins
    });

    }

    const getPortfolio = async (req, res) => {

    const { userId } = req.params;


    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const positions = await Position.find({ user: userId }).populate("market");
    
        let totalWorthNow = 0;
    let totalSpent = 0;

        const result = positions.map((pos) => {

            const market = pos.market;

            const currentValue = (pos.yesShares * (market.polymarketYesPrice || 0) + pos.noShares * (market.polymarketNoPrice || 0));

                    const originalCost =(pos.yesShares * (pos.yesAvgPrice || 0)) +(pos.noShares * (pos.noAvgPrice || 0));

        const pnl = currentValue - originalCost;

        totalWorthNow += currentValue;
        totalSpent += originalCost;

        return {
            market: market.question,

         profitLoss: pnl.toFixed(2),

            currentValue: currentValue.toFixed(2),

            originalCost: originalCost.toFixed(2),

            status: pnl >= 0 ? "PROFIT" : "LOSS"
        }
    }
        )
    res.json({
        username: user.username,
        cashLeft: user.coins,

        portfolioValue: totalWorthNow.toFixed(2),

                totalInvested: totalSpent.toFixed(2),

        overallPnL: (totalWorthNow - totalSpent).toFixed(2),

        positions: result
    
    });
}

// selling business now

const sell = async (req, res) => {
  const { userId, marketId, side, shares } = req.body;

  const user = await User.findById(userId);
  const market = await Market.findById(marketId);

  // stupid errors

      if (!user || !market) {
        return res.status(404).json({
            message: !user ? "User not found" : "Market not found"
        });
    }

    const position = await Position.findOne({ user: userId, market: marketId });

    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    const availableShares = side === "YES" ? position.yesShares : position.noShares;

    if (availableShares < shares) {
      return res.status(400).json({ message: "Not enough broo" });
    }

    const price = side === "YES" ? market.polymarketYesPrice : market.polymarketNoPrice;

    // money incoming

    const coinReceived = shares * price;

    user.coins += coinReceived;

        if (side === "YES") {
        position.yesShares -= shares;
    } else {
        position.noShares -= shares;
    }

    await user.save();
    await position.save();

        res.json({
        success: true,
        coinsReceived : coinReceived,
        coinsLeft: user.coins
    });
  };

const getPosition = async (req,res) => {

const {userId, marketId} = req.params;

const position = await Position.findOne({
  user:userId,
  market:marketId
})

if (!position) {
  return res.json({
                yesShares: 0,
            noShares: 0,
            yesAvgPrice: 0,
            noAvgPrice: 0
  })
}

    res.json(position);

}

            
module.exports = { buy,getPortfolio, sell, getPosition};