var BreweryService = require("../services/breweryService");

const breweryService = BreweryService.getInstance();

const breweriesController = (req, res) => {
  const query = String(req.query.q ?? "");

  if (!("filterOption" in req.body)) {
    const breweries = breweryService.getBreweriesByQuery(query);
    res.json(breweries);
  } else if ("breweriesData" in req.body) {
    const breweries = breweryService.filterBreweriesByOption(
      req.body.breweriesData,
      req.body.filterOption
    );
    res.json(breweries);
  } else if (query !== "") {
    const breweries = breweryService.getBreweriesByQueryOnFilter(
      query,
      req.body.filterOption
    );
    res.json(breweries);
  } else if (query === "") {
    const breweries = breweryService.getAllBreweries();
    res.json(breweries);
  } else {
  }
};

module.exports = breweriesController;
