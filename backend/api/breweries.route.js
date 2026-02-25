import express from "express";
import BreweriesController from "./breweries.controller.js";

const router = express.Router();

// GET /api/v1/vag/breweries
router.get("/", BreweriesController.apiGetBreweries);

export default router;