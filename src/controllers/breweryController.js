var BreweryService = require("../services/breweryService");

const breweryService = BreweryService.getInstance();

const breweryController = async (req, res) => {
  const method = req.method;
  const breweryId = req.params.id;
  switch (method) {
    case "GET":
      const brewery = await breweryService.getBreweryById(breweryId);
      if (brewery) {
        res.json(brewery);
      } else {
        res.status(404).json({ error: "찾으시는 브루어리가 없습니다." });
      }
      break;
    case "POST":
      const newBrewery = req.body;
      breweryService.createBrewery(newBrewery);
      break;
    case "PATCH":
      const updatedBrewery = req.body;
      const result = await breweryService.updateBrewery(updatedBrewery);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ error: "뭔가 잘못됐습니다" });
      }
      break;
    case "DELETE":
      await breweryService.deleteBrewery(breweryId);
      break;
    default:
      break;
  }
};

module.exports = breweryController;
