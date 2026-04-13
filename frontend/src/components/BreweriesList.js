import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function BreweriesList() {

  const [breweries, setBreweries] = useState([])
  const [search, setSearch] = useState("")

  const backendUrl = process.env.REACT_APP_BACKEND_URL

  // GET ALL BREWERIES
  const getBreweries = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/vag/breweries`
      )
      setBreweries(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // SEARCH BREWERIES
  const searchBreweries = async () => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/vag/breweries?name=${search}`
      )
      setBreweries(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBreweries()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Breweries</h1>

      {/* SEARCH BOX */}
      <input
        type="text"
        placeholder="Search breweries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={searchBreweries}>
        Search
      </button>

      <button onClick={getBreweries}>
        Reset
      </button>

      <hr />

      {/* LIST */}
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

          <Link to={`/vag_breweries/${b._id}`}>
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}