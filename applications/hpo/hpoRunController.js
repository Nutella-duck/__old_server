const knex = require("../../db/knex");

let hpoRunController = {};

hpoRunController.read = async (req, res) => {
  knex
    .select("target", "config", "runName")
    .from("hporun")
    .then((result) => {
      res.json(result);
    });
};

module.exports = hpoRunController;
