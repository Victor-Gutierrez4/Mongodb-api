import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import BreweriesDAO from "./dao/breweriesDAO.js";
import breweriesRoutes from "./api/breweries.route.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/v1/vag/breweries", breweriesRoutes);

async function start() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();
    console.log("Connected to MongoDB");

    await BreweriesDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.error(`Failed to start server: ${e}`);
  }
}

start();