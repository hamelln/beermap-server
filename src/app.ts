import express from "express";
import path from "path";
import cors from "cors";
import breweriesRouter from "./routes/breweriesRouter";
import BreweryService from "./services/breweryService";
import { PORT } from "./utils/constants";

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/breweries", breweriesRouter);

(async () => {
  new BreweryService();
})();
