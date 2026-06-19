import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import MarketPage from "./pages/MarketPage";
// import Portfolio from "./pages/Portfolio";


function App() {

  const [page,setPage] = useState("home");
      const [selectedMarketId, setSelectedMarketId] = useState(null);
      const [user, setUser] = useState(null);


const userId = "6a357a42670337823e748518";

    async function loadUser() {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
    }

function openMarket(id){
  setSelectedMarketId(id);
  setPage("market");
}

useEffect(() => { loadUser(); }, []);

return (
          <div className="container">

            <div className="topbar">
                          <h1>Lopymarket</h1>

                <div className="coins">
                    Coins: {user ? user.coins.toFixed(2) : "Loading..."}
                </div>
            </div>

                        <div className="nav">
                <button className = {page === "home" ? "active":""}
                  onClick={()=> setPage("home")}>Markets</button >


              </div>
            {page === "home" && <Home onMarketClick={openMarket} />}

            {page === "market" && <MarketPage marketId ={selectedMarketId} userId={userId} onUserChange = {loadUser} onBack = {() => setPage("home")} />}

            </div>
)


}

export default App;