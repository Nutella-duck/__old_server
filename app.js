const express = require("express");
const db = require("./models");
const project = require("./routes/projectRoute");
const run = require("./routes/runRoute");
const app = express();
const bodyParser = require("body-parser");

const port = 7000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .then(() => {
    console.log("DB Sync complete.");
    //return db.sequelize.sync();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use(bodyParser.json());

app.use("/admin", project);

app.use("/admin", run);

app.listen(port, () => {
  console.log('Express listening on port', port);
});