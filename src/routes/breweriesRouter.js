var express = require("express");
var breweryController = require("../controllers/breweryController");
var breweriesController = require("../controllers/breweriesController");

const breweriesRouter = express.Router();

breweriesRouter.post("/new", breweryController);
breweriesRouter.get("/:id", breweryController);
breweriesRouter.patch("/:id", breweryController);
breweriesRouter.delete("/:id", breweryController);
breweriesRouter.post("/", breweriesController);

module.exports = breweriesRouter;
