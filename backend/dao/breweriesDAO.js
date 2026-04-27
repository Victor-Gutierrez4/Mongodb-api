// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import { ObjectId } from "mongodb"

let breweries
let breweriesComments

export default class BreweriesDAO {
  static async injectDB(conn) {
    if (breweries && breweriesComments) return

    try {
      const db = await conn.db(process.env.DB_NAME)
      breweries = await db.collection(process.env.COLLECTION_NAME)
      breweriesComments = await db.collection("comments")
    } catch (e) {
      console.error(`Unable to establish collection handles: ${e}`)
    }
  }

  static async getBreweries() {
    try {
      return await breweries.find({}).toArray()
    } catch (e) {
      console.error(`Unable to get breweries: ${e}`)
      return []
    }
  }

  static async getBreweriesByName(name) {
    try {
      return await breweries.find({
        name: { $regex: name, $options: "i" }
      }).toArray()
    } catch (e) {
      console.error(`Unable to search breweries: ${e}`)
      return []
    }
  }

  static async getBreweryByID(id) {
    try {
      return await breweries.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      console.error(`Unable to get brewery by ID: ${e}`)
      return null
    }
  }

  static async getComments(breweryId) {
    try {
      return await breweriesComments
        .find({ breweryId: breweryId })
        .sort({ lastModified: -1 })
        .toArray()
    } catch (e) {
      console.error(`Unable to get comments: ${e}`)
      return []
    }
  }

  static async addComment(breweryId, text, userName, userId, date) {
    try {
      const commentDoc = {
        breweryId,
        text,
        userName,
        userId,
        lastModified: date
      }

      return await breweriesComments.insertOne(commentDoc)
    } catch (e) {
      console.error(`Unable to post comment: ${e}`)
      return { error: e }
    }
  }

  static async updateComment(commentId, userId, text, date) {
    try {
      return await breweriesComments.updateOne(
        { _id: commentId, userId: userId },
        { $set: { text: text, lastModified: date } }
      )
    } catch (e) {
      console.error(`Unable to update comment: ${e}`)
      return { error: e }
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      return await breweriesComments.deleteOne({
        _id: commentId,
        userId: userId
      })
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`)
      return { deletedCount: 0, error: e }
    }
  }
}