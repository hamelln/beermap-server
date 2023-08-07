import express from "express";
import path from "path";
import cors from "cors";
import passportConfig from "./passport";
import breweriesRouter from "./routes/breweriesRouter";
import BreweryService from "./services/breweryService";

passportConfig();

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/breweries", breweriesRouter);

(async () => {
  new BreweryService();
})();
