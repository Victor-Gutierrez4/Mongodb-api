import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

export default function Brewery() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const getBrewery = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/api/v1/vag/breweries/id/${id}`
        );
        setBrewery(res.data);
      } catch (err) {
        console.log("DETAIL ERROR:", err);
      }
    };

    getBrewery();
  }, [id, backendUrl]);

  if (!brewery) {
    return <p style={{ padding: "20px" }}>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{brewery.name}</h1>
      <p>
        <strong>Type:</strong> {brewery.brewery_type}
      </p>
      <p>
        <strong>City:</strong> {brewery.city}
      </p>
      <p>
        <strong>State:</strong> {brewery.state}
      </p>

      {brewery.image && (
        <img
          src={brewery.image}
          alt={brewery.name}
          style={{ maxWidth: "400px", width: "100%", marginTop: "10px" }}
        />
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/vag_breweries">Back to Breweries</Link>
      </div>
    </div>
  );
}