import Brewery from "./brewery";

export interface User {
  userName: string;
  email: string;
  likes: Brewery[];
}
