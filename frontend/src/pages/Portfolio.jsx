import {useState, useEffect} from "react";
import axios from "axios";

function Portfolio({userId}) {
    const [data, setData] = useState(null);

    useEffect(() => {
        load();
    },[userId]);


async function load(){
    const res = await axios.get(`http://localhost:5000/api/trade/portfolio/${userId}`);
  setData(res.data);
}

if (!data) return <p>Loading....</p>


return (
    <div>
       <h2>Portfolio</h2>
<div className = "preview-box">
 <p>Cash left: <strong>{data.cashLeft}</strong> coins</p>
<p>Total invested: <strong>{data.totalInvested}</strong></p>
<p>Current value: <strong>{data.portfolioValue}</strong></p>
<p>Overall P/L: <strong>{data.overallPnL}</strong></p>
</div>

{!data.positions || data.positions.length === 0 && <p>No positions yet.</p>}

{data.positions.map((pos,i) => (
<div key={i} className="preview-box">
<h4>{pos.market}</h4>
                    <p>Spent: {pos.originalCost} coins</p>
                    <p>Worth now: {pos.currentValue} coins</p>
                    <p>Profit/Loss: {pos.profitLoss} ({pos.status})</p>
                </div>


))}


    </div>
)
}

export default Portfolio