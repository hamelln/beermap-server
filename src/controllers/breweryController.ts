import { Request, Response } from "express";
import BreweryService from "../services/breweryService";

const breweryService = BreweryService.getInstance();

const breweryController = (req: Request, res: Response) => {
  const id = req.params.id;
  const brewery = breweryService.getBreweryById(id);

  if (brewery) {
    res.json(brewery);
  } else {
    res.status(404).json({ error: "찾으시는 브루어리가 없습니다." });
  }
};

export default breweryController;
