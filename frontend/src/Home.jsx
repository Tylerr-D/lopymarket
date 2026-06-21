import { useState, useEffect } from "react";
import axios from "axios";

function Home({ onMarketClick }) {
    const [markets, setMarkets] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadMarkets();
    }, []);

    async function loadMarkets() {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/api/markets");

    setMarkets(res.data);
    }

    async function handleSearch(e) {

      
const value = e.target.value;
        setSearch(value);

        if (value.length === 0) {
            loadMarkets();
            return;
        }

        if (value.length >= 2) {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/markets/search?q=${value}`);
            setMarkets(res.data);

        }
    }

    return (
        <div>
            <input className="search" type="text" placeholder="Search markets..." value={search} onChange={handleSearch} />

            {markets?.map((market) => (
                <div key={market._id} className="market" onClick={() => onMarketClick(market._id)}>
                    <h3>{market.question}</h3>
                    <div className="prices">
                        <span className="yes-price">YES: {(market.polymarketYesPrice * 100).toFixed(1)}%</span>

                        <span className="no-price">NO: {(market.polymarketNoPrice * 100).toFixed(1)}%</span>
                    </div>


                    <p>Volume: ${Math.round(market.volume || 0).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
    
}

export default Home;
