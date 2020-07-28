var dotenv = require("dotenv");
var express = require("express");
var db = require("./models");
var project = require("./routs/projectRoute");
var app = express();
var bodyParser = require("body-parser");

const port = 7000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .then(() => {
    console.log("DB Sync complete.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.end("hello node");
});
app.use("/admin", project);

app.listen(port, () => {});
