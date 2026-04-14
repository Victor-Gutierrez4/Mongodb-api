// Name: Victor Gutierrez
// Course: IT-302
// Section: 452
// Assignment: Phase 4 React Frontend
// Date: 4/13/26
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
const port = process.env.PORT || 5000

// ✅ FIXED ROUTE (MUST include UCID "vag")
app.use("/api/v1/vag/breweries", breweriesRoutes)

// Catch-all for invalid routes
app.use((req, res) => res.status(404).json({ error: "Not found" }))

// Connect to MongoDB and start server
MongoClient.connect(process.env.MONGO_URI, {})
  .then(async client => {
    await BreweriesDAO.injectDB(client)
    console.log("Connected to MongoDB")

    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })