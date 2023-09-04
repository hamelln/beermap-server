var StartFirebase = require("../../firebase");
var { v1: uuidv1 } = require("uuid");
var Presenter = require("./presenter");
var summarizeOfficeHours = require("../utils/summarizeOfficeHours");
var ImageUploader = require("./image-uploader");

class BreweryService {
  allBreweries;
  breweryList = [];
  #presenter = new Presenter(StartFirebase());
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new BreweryService();
      this.instance.loadAllBreweries();
    }
    return this.instance;
  }

  #createBreweryList(allBreweries) {
    for (const key in allBreweries) {
      const brewery = allBreweries[key];
      this.breweryList.push(brewery);
    }
  }

  #isQueryInBreweryAddress(query, breweryName, city, stateProvince) {
    return (
      breweryName.includes(query) ||
      stateProvince.includes(query) ||
      city.includes(query)
    );
  }

  async loadAllBreweries() {
    this.allBreweries = await this.#presenter.fetchAllBreweries();
    this.#createBreweryList(this.allBreweries);
  }

  getAllBreweries() {
    return this.breweryList;
  }

  getBreweryById(breweryId) {
    return this.allBreweries[breweryId];
  }

  async getSummarizedBreweryById(breweryId) {
    const brewery = await this.#presenter.readBrewery(breweryId);
    const summarizedOfficeHours = summarizeOfficeHours(brewery.officeHours);
    const breweryAddedSummarizeOfficeHours = {
      ...brewery,
      summarizedOfficeHours,
    };
    return breweryAddedSummarizeOfficeHours;
  }

  getBreweriesByQuery(query) {
    const breweries = this.breweryList.filter(
      ({ breweryName, city, stateProvince }) =>
        this.#isQueryInBreweryAddress(query, breweryName, city, stateProvince)
    );
    return breweries;
  }

  async createBrewery(newBrewery) {
    let breweryId = uuidv1();
    while (breweryId in this.allBreweries) {
      breweryId = uuidv1();
    }
    const newBreweryAddedId = { id: breweryId };
    for (const k in newBrewery) {
      newBreweryAddedId[k] = newBrewery[k];
    }
    await this.#presenter.createBrewery(newBreweryAddedId);
  }

  async updateBrewery(updatedBrewery) {
    const breweryId = updatedBrewery.id;
    const images = getBreweryById(breweryId).images;
    const newImages = updatedBrewery.images;
    this.checkAndDeleteImages(images, newImages);
    return await this.#presenter.updateBrewery(updatedBrewery);
  }

  async checkAndDeleteImages(images, newImages) {
    const imagesToDelete = images.filter((image) => {
      const index = newImages.findIndex((newImage) => image.id === newImage.id);
      return index === -1;
    });
    imagesToDelete.map((image) => {
      ImageUploader.delete(image.id);
    });
  }

  async deleteBrewery(breweryId) {
    await this.#presenter.deleteBrewery(breweryId);
  }
}

module.exports = BreweryService;
