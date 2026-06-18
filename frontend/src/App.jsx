import { useState } from "react";
import Home from "./pages/Home";
import MarketPage from "./pages/MarketPage";
// import Portfolio from "./pages/Portfolio";

function App() {

  const [page,setPage] = useState("home");
      const [selectedMarketId, setSelectedMarketId] = useState(null);

const userId = "6a33c575b0e5e52c34ac85fe";

function openMarket(id){
  setSelectedMarketId(id);
  setPage("market");
}

return (
          <div className="container">

            <h1>Lopymarket</h1>

                        <div className="nav">
                <button className = {page === "home" ? "active":""}
                  onClick={()=> setPage("home")}>Markets</button >

                  
                                    {/* <button className = {page === "portfolio" ? "active":""}
onClick ={() => setPage("portfolio")}>Portfolio</button> */}

              </div>
            {page === "home" && <Home onMarketClick={openMarket} />}

            {page === "market" && <MarketPage marketId ={selectedMarketId} userId={userId} onBack = {() => setPage("home")} />}

              {/* {page === "portfolio" && <Portfolio userId={userId} />} */}
            </div>
)


}

export default App;