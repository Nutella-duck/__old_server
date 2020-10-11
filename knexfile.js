const dotenv = require("dotenv");
const path = require("path");
const env = require("./properties/Config.json");
console.log(env.server);

let configData =
  env.local.trim() == "development"
    ? require("./properties/LocalConfig.json")
    : require("./properties/ServerConfig.json");

dotenv.config({ path: path.join(__dirname, configData.dir) });
console.log(process.env.DB_USER);
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      tableName: "nutellaMigrations",
    },
  },

  // migrations: {
  //   directory: './db/migrations'
  // },
  // seeds: {
  //   directory: './db/seeds'
  // }
};
