var dotenv = require("dotenv");
var Sequelize = require("sequelize");
var fs = require("fs");
var path = require("path");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: 3306,
    dialect: "mysql",
  }
);

let db = [];

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".js") && file !== "index.js";
  })
  .forEach((file) => {
    //var model = sequelize.import(path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
