const express = require("express");
const knex = require('knex');
const knexFile = require('./knexfile').development;
const db = knex(knexFile);
const project = require("./routes/projectRoute");
const run = require("./routes/runRoute");
const app = express();
const bodyParser = require("body-parser");

const port = 7000;

// db.migrate.latest();
// db.seed.run();
// db.migrate.down();

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use(express.static("swagger"));

app.use(bodyParser.json());

app.use("/admin", project);

app.use("/admin", run);

app.listen(port, () => {
  console.log("Express listening on port", port);
});
