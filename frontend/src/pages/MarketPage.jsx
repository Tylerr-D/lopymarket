import { useState, useEffect } from "react";
import axios from "axios";

function MarketPage({ marketId, userId, onBack }) {

        const [market, setMarket] = useState(null);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() =>{
        loadMarket();
    },
    [marketId]);

    async function loadMarket(){
        const res = await axios.get(
            `http://localhost:5000/api/markets/${marketId}`);

            setMarket(res.data);
        };

        async function handleBuy(side){
                const res = await axios.post(
                "http://localhost:5000/api/trade/buy",
                {
                    userId,
                    marketId,
                    side,
                    amount: Number(amount)
                }
            );

            setMessage(`you bought ${res.data.sharesBought.toFixed(2)} ${side} shares!`)
            setAmount("");
        }

         async function handleSell(side) {

               const res = await axios.post(
                "http://localhost:5000/api/trade/sell",
                {
                    userId,
                    marketId,
                    side,
                    shares: Number(amount)
                }
            )
          setMessage(`sold! Got ${res.data.coinsReceived.toFixed(2)} coins back`);
         setAmount("");
        
        }

        if (!market) return <p>Loading...</p>

        return (
            <div>
<button className ="btn btn-back" onClick={onBack}>Back</button>

<h2>{market.question}</h2>

{market.image && (
    <img src = {market.image} style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />

)}

 <div className="prices" style={{ fontSize: 24, marginBottom: 20 }}>
                <span className="yes-price">
                    YES: {(market.polymarketYesPrice * 100).toFixed(1)}%
                </span>
                <span className="no-price">
                    NO: {(market.polymarketNoPrice * 100).toFixed(1)}%
                </span>
            </div>

            <p className="volume">
                Volume: ${Math.round(market.volume || 0).toLocaleString()}
            </p>

            <div style={{ marginTop: 20 }}>
                <input
                    className="input-amount"
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button className="btn btn-yes" onClick={() => handleBuy("YES")}>
                    Buy YES
                </button>

                <button className="btn btn-no" onClick={() => handleBuy("NO")} style={{ marginLeft: 8 }}>
                    Buy NO
                </button>
            </div>

            <div style={{ marginTop: 10 }}>
                <button className="btn btn-yes" onClick={() => handleSell("YES")} style={{ opacity: 0.7 }}>
                    Sell YES
                </button>

                <button className="btn btn-no" onClick={() => handleSell("NO")} style={{ marginLeft: 8, opacity: 0.7 }}>
                    Sell NO
                </button>
            </div>

            {message && <p style={{ marginTop: 16, color: "#ffd700" }}>{message}</p>}
        </div>
    );
}

export default MarketPage;

        

    