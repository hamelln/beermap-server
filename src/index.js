var app = require("./app.js");

var port = normalizePort(3000);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
