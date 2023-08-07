import {
  Database,
  DatabaseReference,
  DataSnapshot,
  get,
  ref,
} from "firebase/database";

class Presenter {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async fetchAllBreweries() {
    const breweriesRef: DatabaseReference = ref(this.database, "breweries");
    const breweriesSnapshot: DataSnapshot = await get(breweriesRef);
    const breweries = breweriesSnapshot.val();
    return breweries;
  }
}

export default Presenter;
