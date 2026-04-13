let breweries

export default class BreweriesDAO {

  static async injectDB(conn) {
    if (breweries) return

    try {
      breweries = await conn
        .db(process.env.DB_NAME)
        .collection(process.env.COLLECTION_NAME)
    } catch (e) {
      console.error(`Unable to connect: ${e}`)
    }
  }

  // ✅ GET ALL BREWERIES
  static async getBreweries() {
    try {
      return await breweries.find({}).toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  // ✅ SEARCH BY NAME
  static async getBreweriesByName(name) {
    try {
      return await breweries.find({
        name: { $regex: name, $options: "i" }
      }).toArray()
    } catch (e) {
      console.error(e)
      return []
    }
  }

  // ✅ GET BY ID
  static async getBreweryByID(id) {
    try {
      return await breweries.findOne({ _id: new ObjectId(id) })
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // ================= COMMENTS (keep yours) =================

  static async addComment(breweryId, text, userName, userId, date) {
    return breweries.insertOne({
      breweryId,
      text,
      userName,
      userId,
      lastModified: date
    })
  }

  static async updateComment(commentId, userId, text, date) {
    return breweries.updateOne(
      { _id: commentId, userId },
      { $set: { text, lastModified: date } }
    )
  }

  static async deleteComment(commentId, userId) {
    return breweries.deleteOne({ _id: commentId, userId })
  }
}