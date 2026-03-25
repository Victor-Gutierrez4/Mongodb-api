import BreweriesDAO from "../dao/breweriesDAO.js"
import mongodb from "mongodb"

export default class BreweriesController {

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

    const result = await BreweriesDAO.deleteComment(commentId, userId)

    // ✅ CHECK if anything was actually deleted
    if (result.deletedCount === 1) {
      res.status(200).json({ status: "success" })
    } else {
      res.status(404).json({ error: "Comment not found or already deleted" })
    }

  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
}