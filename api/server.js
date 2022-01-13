const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("../api/db");
const { Operation, Categories, User } = require("../api/models");
const helmet = require("helmet");

//.env environment variables
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;

//middlewares
app.use(helmet());
app.use(morgan("dev"));
var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const router = require("./routes");
app.use(express.json());

// api/routes
app.use("/api", router);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// server port sincronized with db
db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
  });
});
