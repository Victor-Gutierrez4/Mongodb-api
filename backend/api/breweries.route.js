// Name: Victor Gutierrez
// Course: IT-302
// Section: 452
// Assignment: Phase 4 React Frontend
// Date: 4/13/26
// Email: vag@njit.edu
import express from "express"
import BreweriesCtrl from "./breweries.controller.js"

const router = express.Router()

// ✅ GET ALL breweries + SEARCH (query params)
router
  .route("/")
  .get(BreweriesCtrl.apiGetBreweries)

// ✅ GET ONE brewery by ID
router
  .route("/id/:id")
  .get(BreweriesCtrl.apiGetBreweryById)

// ✅ COMMENTS ROUTES (already required from previous assignment)
router
  .route("/comments")
  .post(BreweriesCtrl.apiPostComment)
  .put(BreweriesCtrl.apiUpdateComment)
  .delete(BreweriesCtrl.apiDeleteComment)

export default router