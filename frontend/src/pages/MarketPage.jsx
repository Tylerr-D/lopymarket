import { useState, useEffect } from "react";
import axios from "axios";

function MarketPage({ marketId, userId, onBack, onUserChange }) {
    const [market, setMarket] = useState(null);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadMarket();
    }, [marketId]);

    async function loadMarket() {
        const res = await axios.get(`http://localhost:5000/api/markets/${marketId}`);
        setMarket(res.data);
    }

    function getPrice(side){
        if (!market) return 0;

        if (side ==="YES"){
            return market.polymarketYesPrice || 0;
        }

        return market.polymarketNoPrice || 0;
    }

function getCost(side) {
    if (!amount) return 0;

    const numShares = Number(amount);

    if (isNaN(numShares) || numShares <= 0) {
        return 0;
    }

    const price = getPrice(side);

    return numShares * price;
}

    async function handleBuy(side) {

        const numShares = Number(amount);

        if (!numShares || numShares <= 0) {
            setMessage("enter number of shares");
            return;
        }

const cost = getCost(side)

        const res = await axios.post("http://localhost:5000/api/trade/buy", {
            
            userId,
            marketId,
            side,
            amount: Number(amount)
        });
        setMessage(`Bought ${res.data.sharesBought.toFixed(2)} ${side} shares!`);
        setAmount("");

                if (onUserChange) {
            onUserChange();
        }
    }

    async function handleSell(side) {

        const numShares = Number(amount);
        if (!numShares || numShares <= 0) {
            setMessage("Enter number of shares");
            return;
        }

        const res = await axios.post("http://localhost:5000/api/trade/sell", {

            userId,
            marketId,
            side,
            shares: numShares
        });
        setMessage(`Sold! Got ${res.data.coinsReceived.toFixed(2)} coins back`);
        setAmount("");

             if (onUserChange) {
            onUserChange();
        }

    }


    

    if (!market) return <p>Loading...</p>;

        const yesCost = getCost("YES");
    const noCost = getCost("NO");

        const numShares = Number(amount) || 0;

    const yesProfitIfCorrect = numShares - yesCost;
    const noProfitIfCorrect = numShares - yesCost;

    return (
        <div>
   <button className="btn btn-back" onClick={onBack}>Back</button>

            <h2>{market.question}</h2>

      {market.image && <img src={market.image} style={{ width: "100%", maxHeight: 250, objectFit: "cover", marginBottom: 15 }} />}

             <div style={{ display: "flex", gap: 20, marginBottom: 15 }}>
                <div>
                    <span style={{ color: "#94a3b8" }}>YES </span>
                    <span className="yes-price">
                        {(market.polymarketYesPrice * 100).toFixed(1)}%
                    </span>
                </div>
                <div>
                    <span style={{ color: "#94a3b8" }}>NO </span>
                    <span className="no-price">
                        {(market.polymarketNoPrice * 100).toFixed(1)}%
                    </span>
                </div>
            </div>
            

             <div style={{ marginBottom: 15 }}>
                <label style={{ color: "#94a3b8" }}>Shares</label>
                <input className="input-amount" type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: "100%", marginTop: 5 }} />
            </div>

       

            {numShares > 0 &&(
                <div className = "preview-box">
              <h3>Trade Preview</h3>
                        <div className="preview-line">
            <span>Shares</span>
            <strong>{numShares}</strong>
        </div>

         <div className="preview-line">
            <span>Buy YES cost</span>
            <strong>{yesCost.toFixed(2)} coins</strong>
        </div>

                <div className="preview-line">
            <span>If YES is correct, receive</span>
            <strong>{numShares.toFixed(2)} coins</strong>
        </div>

          <div className="preview-line">
            <span>YES profit if correct</span>
            <strong>{yesProfitIfCorrect.toFixed(2)} coins</strong>
        </div>

        <hr />

                <div className="preview-line">
            <span>Buy NO cost</span>
            <strong>{noCost.toFixed(2)} coins</strong>
        </div>

        <div className="preview-line">
            <span>If NO is correct, receive</span>
            <strong>{numShares.toFixed(2)} coins</strong>
        </div>

                <div className="preview-line">
            <span>NO profit if correct</span>
            <strong>{noProfitIfCorrect.toFixed(2)} coins</strong>
        </div>



                </div>
            )



        }

            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <button className="btn btn-yes" onClick={() => handleBuy("YES")} style={{ flex: 1 }}
                > Buy YES ({yesCost > 0 ? yesCost.toFixed(2) : "0"} coins)
                </button>

                  <button
                    className="btn btn-no"
                    onClick={() => handleBuy("NO")}
                    style={{ flex: 1 }}
                > Buy NO ({noCost > 0 ? noCost.toFixed(2) : "0"} coins) </button>
</div>

             <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-yes" onClick={() => handleSell("YES")} style={{ flex: 1, opacity: 0.6 }}>
                    Sell YES
                </button>

                 <button className="btn btn-no" onClick={() => handleSell("NO")} style={{ flex: 1, opacity: 0.6 }} >
                    Sell NO
                </button>
                </div>

                            {message && (<div style={{ marginTop: 15, color: "#fbbf24", textAlign: "center" }}>{message}
                </div>
                            )}
                </div>


    );
}

export default MarketPage;