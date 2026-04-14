import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import BreweriesList from "./components/BreweriesList";
import Brewery from "./components/brewery";

function App() {
  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/vag_breweries">Breweries</Link>
      </nav>

      <Routes>
        <Route path="/" element={<BreweriesList />} />
        <Route path="/vag_breweries" element={<BreweriesList />} />
        <Route path="/vag_breweries/:id" element={<Brewery />} />
      </Routes>
    </div>
  );
}

export default App;