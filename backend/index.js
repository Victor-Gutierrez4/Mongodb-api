// Name: Victor Gutierrez
// Course: IT-302
// Assignment: Phase 3 Backend
// Date: 3/24/26
// Email: vag@njit.edu

import express from "express"
import cors from "cors"
import mongodb from "mongodb"
import dotenv from "dotenv"

import BreweriesDAO from "./dao/breweriesDAO.js"
import breweriesRoutes from "./api/breweries.route.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000

// Use brewery routes
app.use("/api/v1/breweries", breweriesRoutes)

// Catch-all for 404
app.use((req, res) => res.status(404).json({ error: "Not found" }))
// Connect to MongoDB and start server
MongoClient.connect(process.env.MONGO_URI, {})
  .then(async client => {
    await BreweriesDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })