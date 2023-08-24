var { get, remove, update, set, ref } = require("firebase/database");

class Presenter {
  database;

  constructor(database) {
    this.database = database;
  }

  async fetchAllBreweries() {
    const breweriesRef = ref(this.database, "breweries");
    const breweriesSnapshot = await get(breweriesRef);
    const breweries = breweriesSnapshot.val();
    return breweries;
  }

  async createBrewery(newBrewery) {
    const newBreweryRef = ref(this.database, `breweries/${newBrewery.id}`);
    await set(newBreweryRef, newBrewery);
  }

  async readBrewery(breweryId) {
    const breweryRef = ref(this.database, `breweries/${breweryId}`);
    const brewerySnapshot = await get(breweryRef);
    const brewery = brewerySnapshot.val();
    return brewery;
  }

  async updateBrewery(updatedBrewery) {
    const breweryRef = ref(this.database, `breweries/${updatedBrewery.id}`);
    await update(breweryRef, updatedBrewery);
    const result = await this.readBrewery(updatedBrewery.id);
    return result;
  }

  async deleteBrewery(breweryId) {
    const breweryRef = ref(this.database, `breweries/${breweryId}`);
    remove(breweryRef);
  }
}

module.exports = Presenter;
