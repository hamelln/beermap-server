var express = require("express");
var path = require("path");
var cors = require("cors");
var breweriesRouter = require("./routes/breweriesRouter");
var BreweryService = require("./services/breweryService");
var app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", breweriesRouter);

(async () => {
  new BreweryService();
})();

module.exports = app;
