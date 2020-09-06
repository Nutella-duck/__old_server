const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];

module.exports = require('knex')(config)





const dotenv = require("dotenv");
const knex = require("knex");
const fs = require("fs");
const path = require("path");

dotenv.config();

const knex = new knex({
  client : "mysql2",
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
  }
})