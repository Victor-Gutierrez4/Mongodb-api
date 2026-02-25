let breweries; // holds the collection

export default class BreweriesDAO {
  static async injectDB(conn) {
    if (breweries) return;
    try {
      breweries = await conn.db("it302").collection("breweries_vag"); // database & collection names
      console.log("BreweriesDAO: Connected to MongoDB collection");
    } catch (e) {
      console.error(`Unable to connect to collection: ${e}`);
    }
  }

  static async getBreweries({ filters = null, page = 0, breweriesPerPage = 10 } = {}) {
    let query = {};
    if (filters && "name" in filters) {
      query.name = { $regex: filters["name"], $options: "i" };
    }

    try {
      const cursor = await breweries.find(query)
        .limit(breweriesPerPage)
        .skip(breweriesPerPage * page);

      const breweriesList = await cursor.toArray();
      const totalNumBreweries = await breweries.countDocuments(query);

      return { breweriesList, totalNumBreweries };
    } catch (e) {
      console.error(`Unable to query breweries: ${e}`);
      return { breweriesList: [], totalNumBreweries: 0 };
    }
  }
}