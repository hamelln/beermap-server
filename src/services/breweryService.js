import StartFirebase from "../../firebase";
import summarizeOfficeHours from "../utils/summarizeOfficeHours";
import Presenter from "./presenter";

export default class BreweryService {
  allBreweries = {};
  breweryList = [];
  breweryObject = {};
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new BreweryService();
      this.instance.loadAllBreweries();
    }

    return this.instance;
  }

  #createBreweryList(breweriesInCities) {
    for (const key in breweriesInCities) {
      const l = breweriesInCities[key];
      this.breweryList.push(...l);
    }
  }

  #createBreweryObject(breweryList) {
    breweryList.map((brewery) => {
      this.breweryObject[brewery.id] = brewery;
    });
  }

  #isQueryInBreweryAddress(query, breweryName, city, stateProvince) {
    return (
      breweryName.includes(query) ||
      stateProvince.includes(query) ||
      city.includes(query)
    );
  }

  async loadAllBreweries() {
    const database = StartFirebase();
    const presenter = new Presenter(database);
    this.allBreweries = await presenter.fetchAllBreweries();
    this.#createBreweryList(this.allBreweries);
    this.#createBreweryObject(this.breweryList);
  }

  getBreweryById(id) {
    const brewery = this.breweryObject[id];
    const summarizedOfficeHours = summarizeOfficeHours(brewery.officeHours);
    const newBrewery = { ...brewery, summarizedOfficeHours };
    return newBrewery;
  }

  getBreweriesByQuery(query) {
    const breweries = this.breweryList.filter(
      ({ breweryName, city, stateProvince }) =>
        this.#isQueryInBreweryAddress(query, breweryName, city, stateProvince)
    );
    return breweries;
  }

  getBreweriesByQueryOnFilter(query, filterOption) {
    const breweries = this.breweryList.filter(
      ({ breweryName, city, stateProvince, breweryType }) =>
        this.#isQueryInBreweryAddress(
          query,
          breweryName,
          city,
          stateProvince
        ) && breweryType === filterOption
    );
    return breweries;
  }

  getBreweriesByProvince(city) {
    return this.allBreweries[city];
  }

  filterBreweriesByOption(breweries, filterOption) {
    return breweries.filter(({ breweryType }) => {
      breweryType === filterOption;
    });
  }

  getSummarizedOfficeHour() {}
}
