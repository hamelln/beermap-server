var express = require("express");
var breweryController = require("../controllers/breweryController");
var breweriesController = require("../controllers/breweriesController");

const breweriesRouter = express.Router();

breweriesRouter.get("/:id", breweryController);
breweriesRouter.post("/", breweriesController);

module.exports = breweriesRouter;
