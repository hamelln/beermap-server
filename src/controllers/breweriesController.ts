import { Request, Response } from "express";
import BreweryService from "../services/breweryService";

const breweryService = BreweryService.getInstance();

const breweriesController = (req: Request, res: Response) => {
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
  } else {
    const breweries = breweryService.getBreweriesByQueryOnFilter(
      query,
      req.body.filterOption
    );
    res.json(breweries);
  }
};

export default breweriesController;
