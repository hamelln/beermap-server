const firebase = require("firebase/app");
var { getDatabase } = require("firebase/database");
const { firebaseConfig } = require("./src/utils/constants");

const StartFirebase = () => {
  const app = firebase.initializeApp(firebaseConfig);
  return getDatabase(app);
};

module.exports = StartFirebase;
