// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import BreweriesDAO from "../dao/breweriesDAO.js"
import mongodb from "mongodb"

export default class BreweriesController {
  static async apiGetBreweries(req, res) {
    try {
      const name = req.query.name

      let breweries
      if (name) {
        breweries = await BreweriesDAO.getBreweriesByName(name)
      } else {
        breweries = await BreweriesDAO.getBreweries()
      }

      res.json(breweries)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetBreweryById(req, res) {
    try {
      const brewery = await BreweriesDAO.getBreweryByID(req.params.id)
      res.json(brewery)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetComments(req, res) {
    try {
      const comments = await BreweriesDAO.getComments(req.params.breweryId)
      res.json(comments)
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiPostComment(req, res) {
    try {
      const breweryId = req.body.breweryId
      const text = req.body.text
      const userName = req.body.userName
      const userId = req.body.userId
      const date = new Date()

      await BreweriesDAO.addComment(breweryId, text, userName, userId, date)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiUpdateComment(req, res) {
    try {
      const commentId = new mongodb.ObjectId(req.body.commentId)
      const text = req.body.text
      const userId = req.body.userId
      const date = new Date()

      await BreweriesDAO.updateComment(commentId, userId, text, date)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteComment(req, res) {
    try {
      const commentId = new mongodb.ObjectId(req.body.commentId)
      const userId = req.body.userId

      await BreweriesDAO.deleteComment(commentId, userId)
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}