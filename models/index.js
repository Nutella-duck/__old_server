const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

let configData =
  process.env.NODE_ENV.trim() == "local"
    ? require("../properties/LocalConfig.json")
    : require("../properties/ServerConfig.json");

console.log(configData.dir);
dotenv.config({ path: path.join(__dirname, configData.dir) });

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

db.project.hasMany(db.run, { foreignKey: "project_id" });
db.run.belongsTo(db.project);

module.exports = db;
