const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("../api/db");
const { User, Operation, Categories } = require("../api/models");
const helmet = require("helmet");
const serverConfig = require("./config/server.Config.json");

app.use(helmet());
app.use(morgan("dev"));

//middleware http control access
var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const router = require("./routes");
//parsing middleware
app.use(express.json());
// api/routes
app.use("/api", router);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

// server port  sincronized with db
db.sync({ force: false }).then(() => {
  app.listen(serverConfig.port, () => {
    console.log("Server listening on port " + serverConfig.port);
  });
});
