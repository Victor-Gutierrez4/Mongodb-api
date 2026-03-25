import express from "express"
import BreweriesCtrl from "./breweries.controller.js"

const router = express.Router()

// Routes for comments on breweries
router
  .route("/comments")
  .post(BreweriesCtrl.apiPostComment)
  .put(BreweriesCtrl.apiUpdateComment)
  .delete(BreweriesCtrl.apiDeleteComment)

export default router