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

    async function handleBuy(side) {
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

    return (
        <div>
   <button className="btn btn-back" onClick={onBack}>Back</button>

            <h2>{market.question}</h2>

      {market.image && <img src={market.image} style={{ width: "100%", maxHeight: 250, objectFit: "cover", marginBottom: 15 }} />}

            <div className="info-grid">
                <div className="info-item">

                    <span className="info-label">YES</span>
                    <span className="info-value yes-price">{(market.polymarketYesPrice * 100).toFixed(1)}%</span>
                </div>
                <div className="info-item">

                    <span className="info-label ">NO</span>
                    <span className="info-value no-price">{(market.polymarketNoPrice * 100).toFixed(1)}%</span>

            </div>
                <div className="info-item">
                    <span className="info-label">Volume</span>
                    <span className="info-value volume">${Math.round(market.volume || 0).toLocaleString()}</span>
                </div>
                {market.liquidity && (
                    <div className="info-item">


                        <span className="info-label">Liquidity</span>

                        <span className="info-value">${Math.round(market.liquidity).toLocaleString()}</span>
                    </div>
                )}
            </div>

            <div style={{ marginTop: 20 }}>
                <input className="input-amount" type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

                <button className="btn btn-yes" onClick={() => handleBuy("YES")}>   Buy YES   </button>

                
                <button className="btn btn-no" onClick={() => handleBuy("NO")}>   Buy NO   </button>
            </div>

            <div style={{ marginTop: 15 }}>
                <button className="btn btn-yes" onClick={()=> handleSell("YES")}   style={{opacity: 0.7 }}>Sell YES</button>

                <button className="btn btn-no" onClick={()=> handleSell("NO")} style={{ opacity: 0.7 }}>Sell NO</button>
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default MarketPage;