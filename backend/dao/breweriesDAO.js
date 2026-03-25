let breweriesComments

export default class BreweriesDAO {

  static async injectDB(conn) {
    if (breweriesComments) return
    try {
      breweriesComments = await conn.db(process.env.DB_NAME).collection("comments")
    } catch (e) {
      console.error(`Unable to establish collection handles: ${e}`)
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
        { _id: commentId, userId },
        { $set: { text, lastModified: date } }
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
    // always include deletedCount so controller can check it
    return { deletedCount: 0, error: e }
  }
}
}