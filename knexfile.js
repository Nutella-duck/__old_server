const dotenv = require("dotenv");
const path = require("path");
const env = process.env.NODE_ENV || 'development';

let configData =
  env == "development"
    ? require("./properties/LocalConfig.json")
    : require("./properties/ServerConfig.json");

dotenv.config({ path: path.join(__dirname, configData.dir) });

module.exports = {
  development: {    
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
    }
  },
  production: {    
    client: 'mysql2',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
    }
  },
  // migrations: {
  //   directory: './db/migrations'
  // },
  // seeds: {
  //   directory: './db/seeds'
  // }
};