const express = require("express");
require("express-async-errors");

const PORT = process.env.PORT || 3333;

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  return response.sendStatus(500);
});

app.listen(PORT, () =>
  console.log(`🎈 Server started at http://localhost:${PORT}`)
);
