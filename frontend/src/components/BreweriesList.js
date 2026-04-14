import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function BreweriesList() {
  const [breweries, setBreweries] = useState([])
  const [search, setSearch] = useState("")

  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000"

  const getBreweries = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/vag/breweries`)
      setBreweries(res.data)
    } catch (err) {
      console.log("GET ERROR:", err)
    }
  }

  const searchBreweries = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/vag/breweries?name=${search}`
      )
      setBreweries(res.data)
    } catch (err) {
      console.log("SEARCH ERROR:", err)
    }
  }

  useEffect(() => {
    getBreweries()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Breweries</h1>

      <input
        type="text"
        placeholder="Search breweries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchBreweries}>Search</button>
      <button onClick={getBreweries}>Reset</button>

      <hr />

      {breweries.map((b) => (
        <div
          key={b._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{b.name}</h3>
          <p>{b.city}, {b.state}</p>
          <p>Type: {b.brewery_type}</p>

          <Link to={`/vag_breweries/${b._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  )
}