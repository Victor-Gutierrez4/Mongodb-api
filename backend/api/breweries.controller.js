import BreweriesDAO from "../dao/BreweriesDAO.js";

export default class BreweriesController {
  static async apiGetBreweries(req, res, next) {
    try {
      const itemsPerPage = req.query.itemsPerPage ? parseInt(req.query.itemsPerPage, 10) : 10;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;

      const filters = {};
      if (req.query.name) filters.name = req.query.name;

      const { breweriesList, totalNumBreweries } = await BreweriesDAO.getBreweries({
        filters,
        page,
        breweriesPerPage: itemsPerPage
      });

      res.json({ breweriesList, totalNumBreweries, page });
    } catch (e) {
      console.error(`apiGetBreweries error: ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}