const express = require("express");

require("express-async-errors");

const PORT = process.env.PORT || 3333;

const cors = require("./app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandler");
const routes = require("./routes");

const app = express();

app.use(express.json());
// CORS
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`🎈 Server started at http://localhost:${PORT}`)
);
