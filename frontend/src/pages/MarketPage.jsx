import { useState, useEffect } from "react";
import axios from "axios";

function MarketPage({ marketId, userId, onBack }) {
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


    function getCost(side){
        if (!market || !amount) return 0;
        const num = Number(amount);
        if (isNaN(num) || num <= 0) return 0;

        const cost = side === "YES" ? market.polymarketYesPrice : market.polymarketNoPrice;
        return num * cost;
    }

    async function handleBuy(side) {

        const numShares = Number(amount);

        if (!numShares || numShares <= 0) {
            setMessage("enter number of shares");
            return;
        }



        const res = await axios.post("http://localhost:5000/api/trade/buy", {
            
            userId,
            marketId,
            side,
            amount: Number(amount)
        });
        setMessage(`Bought ${res.data.sharesBought.toFixed(2)} ${side} shares!`);
        setAmount("");
    }

    async function handleSell(side) {

        const numShares = Number(shares);
        if (!numShares || numShares <= 0) {
            setMessage("Enter number of shares");
            return;
        }



        const res = await axios.post("http://localhost:5000/api/trade/sell", {

            userId,

            marketId,
            side,
            shares: Number(amount)
        });
        setMessage(`Sold! Got ${res.data.coinsReceived.toFixed(2)} coins back`);
        setAmount("");
    }
    

    if (!market) return <p>Loading...</p>;

        const yesCost = getCost("YES");
    const noCost = getCost("NO");

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





            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                <button className="btn btn-yes" onClick={() => handleBuy("YES")} style={{ flex: 1 }}
                > Buy YES ({yesCost > 0 ? yesCost.toFixed(2) : "0"} ¢)
                </button>

                  <button
                    className="btn btn-no"
                    onClick={() => handleBuy("NO")}
                    style={{ flex: 1 }}
                > Buy NO ({noCost > 0 ? noCost.toFixed(2) : "0"} ¢) </button>
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