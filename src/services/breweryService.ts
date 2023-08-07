import StartFirebase from "../../firebase";
import Brewery from "../models/brewery";
import summarizeOfficeHours from "../utils/summarizeOfficeHours";
import Presenter from "./presenter";

interface BreweryJson {
  [K: string]: Brewery[];
}

interface BreweryDetailsProps extends Brewery {
  summarizedOfficeHours: string[][];
}

export default class BreweryService {
  private allBreweries: BreweryJson = {};
  private breweryList: Brewery[] = [];
  private breweryObject: { [K: string]: Brewery } = {};
  private static instance: BreweryService;

  public static getInstance(): BreweryService {
    if (!this.instance) {
      this.instance = new BreweryService();
      this.instance.loadAllBreweries();
    }

    return this.instance;
  }

  #createBreweryList(breweriesInCities: BreweryJson): void {
    for (const key in breweriesInCities) {
      const l = breweriesInCities[key];
      this.breweryList.push(...l);
    }
  }

  #createBreweryObject(breweryList: Brewery[]): void {
    breweryList.map((brewery: Brewery) => {
      this.breweryObject[brewery.id] = brewery;
    });
  }

  #isQueryInBreweryAddress(
    query: string,
    breweryName: string,
    city: string,
    stateProvince: string
  ): boolean {
    return (
      breweryName.includes(query) ||
      stateProvince.includes(query) ||
      city.includes(query)
    );
  }

  async loadAllBreweries(): Promise<void> {
    const database = StartFirebase();
    const presenter = new Presenter(database);
    this.allBreweries = await presenter.fetchAllBreweries();
    this.#createBreweryList(this.allBreweries);
    this.#createBreweryObject(this.breweryList);
  }

  getBreweryById(id: string): BreweryDetailsProps {
    const brewery = this.breweryObject[id];
    const summarizedOfficeHours = summarizeOfficeHours(brewery.officeHours);
    const newBrewery = { ...brewery, summarizedOfficeHours };
    return newBrewery;
  }

  getBreweriesByQuery(query: string): Brewery[] {
    const breweries = this.breweryList.filter(
      ({ breweryName, city, stateProvince }: Brewery) =>
        this.#isQueryInBreweryAddress(query, breweryName, city, stateProvince)
    );
    return breweries;
  }

  getBreweriesByQueryOnFilter(query: string, filterOption: string): Brewery[] {
    const breweries = this.breweryList.filter(
      ({ breweryName, city, stateProvince, breweryType }: Brewery) =>
        this.#isQueryInBreweryAddress(
          query,
          breweryName,
          city,
          stateProvince
        ) && breweryType === filterOption
    );
    return breweries;
  }

  getBreweriesByProvince(city: string): Brewery[] {
    return this.allBreweries[city];
  }

  filterBreweriesByOption(
    breweries: Brewery[],
    filterOption: string
  ): Brewery[] {
    return breweries.filter(({ breweryType }: Brewery) => {
      breweryType === filterOption;
    });
  }

  getSummarizedOfficeHour() {}
}

// export async function updateBreweriesData(): Promise<void> {
//   const lastUpdateTimestamp = getLastUpdateTimestamp(); // 마지막 업데이트 시간 구하기, 이 함수는 별도로 구현해야 함.

//   const updatedBreweries: Brewery[] = await getUpdatedBreweries(
//     lastUpdateTimestamp
//   );

//   // 변경된 데이터를 메모리에 있는 데이터와 합치기
//   for (const updatedBrewery of updatedBreweries) {
//     const index = allBreweries.findIndex(
//       (brewery) => brewery.id === updatedBrewery.id
//     );

//     if (index >= 0) {
//       allBreweries[index] = updatedBrewery; // 기존 브루어리 정보 업데이트
//     } else {
//       allBreweries.push(updatedBrewery); // 새로운 브루어리 정보 추가
//     }
//   }

//   // 마지막 업데이트 시간 갱신
//   setLastUpdateTimestamp();
// }

// const getLastUpdateTimestamp = () => {};
// const setLastUpdateTimestamp = () => {};
// const getUpdatedBreweries = (lastUpdateTimestamp) => [];
