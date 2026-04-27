// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import React, { useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import BreweriesList from "./components/BreweriesList"
import Brewery from "./components/brewery"
import Login from "./components/login"
import AddComment from "./components/addcomment"

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  const login = (user = null) => {
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <div>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/vag_breweries" style={{ marginRight: "15px" }}>
          Breweries
        </Link>

        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>
              Logged in as {user.name}
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/vag_login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<BreweriesList />} />
        <Route path="/vag_breweries" element={<BreweriesList />} />
        <Route path="/vag_breweries/:id" element={<Brewery user={user} />} />
        <Route path="/vag_breweries/:id/comment" element={<AddComment user={user} />} />
        <Route path="/vag_login" element={<Login login={login} />} />
      </Routes>
    </div>
  )
}

export default App