import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BreweriesList from "./components/BreweriesList";

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/vag_breweries">
          Breweries
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<BreweriesList />} />
        <Route path="/vag_breweries" element={<BreweriesList />} />
      </Routes>
    </div>
  );
}

export default App;