const knex = require("../../db/knex");

let hpoConfigController = {};

hpoConfigController.bestResult = async (req, res) => {
  const projectId = req.params.id;
  knex
    .select("bestParmeter")
    .from("hpoConfig")
    .where({ hpoProjectId: projectId })
    .then((result) => {
      res.json(result[0]);
    });
};

module.exports = hpoConfigController;
