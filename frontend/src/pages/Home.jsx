import { useState, useEffect } from "react";
import axios from "axios";



function Home({onMarketClick}){
        const [markets, setMarkets] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {loadMarkets()}, []);

async function loadMarkets() {
  const res = await axios.get("http://localhost:5000/api/markets");

    setMarkets(res.data);
}

async function handleSearch(e){
    const value = e.target.value;
    setSearch(value);

    if (value.length ===0){
        loadMarkets();
        return;
    }

    if (value.length < 2){
const res = await axios.get(`http://localhost:5000/api/markets/search?q=${value}`);
        setMarkets(res.data);
    }

   return (
  <div>
    <input
      className="search"
      type="text"
      placeholder="Search markets..."
      value={search}
      onChange={handleSearch}/>

    {markets?.map((market) => (
      <div
        key={market._id}
        className="market"
        onClick={() => onMarketClick(market._id)}>
        <h3>{market.question}</h3>

        <p>Yes: {(market.polymarketYesPrice * 100).toFixed(1)}%</p>
        <p>No: {(market.polymarketNoPrice * 100).toFixed(1)}%</p>

        <p>
          Volume: $
          {Math.round(market.volume).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
);
}
}

export default Home;
