import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "./src/utils/constants";

const StartFirebase = () => {
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
};

export default StartFirebase;
