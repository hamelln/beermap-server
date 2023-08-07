import express from "express";
import breweryController from "../controllers/breweryController";
import breweriesController from "../controllers/breweriesController";

const breweriesRouter = express.Router();

breweriesRouter.get("/:id", breweryController);
breweriesRouter.post("/", breweriesController);

export default breweriesRouter;
