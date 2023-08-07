import app from "./app";

var port = normalizePort(process.env.PORT || "3008");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${3008}`);
});

function normalizePort(val: string | number | any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
