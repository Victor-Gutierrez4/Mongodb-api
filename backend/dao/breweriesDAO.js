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

      console.log("Connected to DB:", process.env.DB_NAME)
      console.log("Using breweries collection:", process.env.COLLECTION_NAME)
    } catch (e) {
      console.error(`Unable to establish collection handles: ${e}`)
    }
  }

  // GET ALL BREWERIES
  static async getBreweries() {
    try {
      const results = await breweries.find({}).toArray()
      console.log("Breweries found:", results.length)
      return results
    } catch (e) {
      console.error(`Unable to get breweries: ${e}`)
      return []
    }
  }

  // SEARCH BREWERIES BY NAME
  static async getBreweriesByName(name) {
    try {
      const results = await breweries.find({
        name: { $regex: name, $options: "i" }
      }).toArray()

      console.log(`Search for "${name}" returned:`, results.length)
      return results
    } catch (e) {
      console.error(`Unable to search breweries: ${e}`)
      return []
    }
  }

  // GET ONE BREWERY BY ID
  static async getBreweryByID(id) {
    try {
      const brewery = await breweries.findOne({
        _id: new ObjectId(id)
      })
      return brewery
    } catch (e) {
      console.error(`Unable to get brewery by ID: ${e}`)
      return null
    }
  }

  // ADD COMMENT
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

  // UPDATE COMMENT
  static async updateComment(commentId, userId, text, date) {
    try {
      return await breweriesComments.updateOne(
        { _id: new ObjectId(commentId), userId: userId },
        { $set: { text: text, lastModified: date } }
      )
    } catch (e) {
      console.error(`Unable to update comment: ${e}`)
      return { error: e }
    }
  }

  // DELETE COMMENT
  static async deleteComment(commentId, userId) {
    try {
      return await breweriesComments.deleteOne({
        _id: new ObjectId(commentId),
        userId: userId
      })
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`)
      return { deletedCount: 0, error: e }
    }
  }
}