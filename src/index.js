const express = require("express");

require("express-async-errors");

const PORT = process.env.PORT || 3100;

const cors = require("./app/middlewares/cors");
const errorHandler = require("./app/middlewares/errorHandler");
const requestLogger = require("./app/middlewares/requestLogger");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`🎈 Server started at http://localhost:${PORT}`)
);
