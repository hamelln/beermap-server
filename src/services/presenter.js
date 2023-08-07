import { get, ref } from "firebase/database";

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
}

export default Presenter;