import { User } from "./User";
import OfficeHours from "./OfficeHours";
import Beer from "./Beer";

export default interface Brewery {
  id: string;
  breweryName: string;
  breweryType: string;
  breweryDescription: string;
  officeHours: OfficeHours;
  signatureBeer: Beer;
  websiteType?: string;
  websiteUrl?: string;
  likes?: User[];
  images?: string[];
  address: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  phone: string;
  longitude: number;
  latitude: number;
}
