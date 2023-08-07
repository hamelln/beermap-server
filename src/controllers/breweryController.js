var BreweryService = require("../services/breweryService");

const breweryService = BreweryService.getInstance();

const breweryController = (req, res) => {
  const id = req.params.id;
  const brewery = breweryService.getBreweryById(id);

  if (brewery) {
    res.json(brewery);
  } else {
    res.status(404).json({ error: "찾으시는 브루어리가 없습니다." });
  }
};

module.exports = breweryController;
