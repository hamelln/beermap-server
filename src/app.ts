import express from "express";
import path from "path";
import breweriesRouter from "./routes/breweriesRouter";
import BreweryService from "./services/breweryService";

const cors = require("cors");
const app = express();

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/breweries", breweriesRouter);

(async () => {
  new BreweryService();
})();

export default app;
