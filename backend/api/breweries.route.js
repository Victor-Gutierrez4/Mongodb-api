// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import express from "express"
import BreweriesCtrl from "./breweries.controller.js"

const router = express.Router()

router.route("/")
  .get(BreweriesCtrl.apiGetBreweries)

router.route("/id/:id")
  .get(BreweriesCtrl.apiGetBreweryById)

router.route("/comments/:breweryId")
  .get(BreweriesCtrl.apiGetComments)

router.route("/comments")
  .post(BreweriesCtrl.apiPostComment)
  .put(BreweriesCtrl.apiUpdateComment)
  .delete(BreweriesCtrl.apiDeleteComment)

export default router