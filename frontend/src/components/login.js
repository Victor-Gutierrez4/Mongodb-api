// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login({ login }) {
  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name: name,
      id: id
    }

    login(user)
    navigate("/vag_breweries")
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>User ID:</label>
          <br />
          <input
            type="text"
            value={id}
            required
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Login
        </button>
      </form>
    </div>
  )
}