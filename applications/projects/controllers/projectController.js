const knex = require("../../../db/knex");
var generateSafeId = require("generate-safe-id");
const { select } = require("../../../db/knex");

let projectController = {};

projectController.create = function (req, res) {
  knex("project")
    .insert({
      description: req.body.params.description,
      projectName: req.body.params.projectName,
      privacy: req.body.privacy,
      apiKey: req.body.apiKey,
    })
    .then(() => {
      res.send("A project is created");
    });
};

projectController.getkey = function (req, res) {
  res.send(generateSafeId());
};

projectController.read = function (req, res) {
  knex("project")
      .where("projectId", req.params.id)
      .select("projectId", "projectName") // totalruns
      .then((projectList) => {
      res.json(projectList);
  });
};

projectController.delete = function (req, res) {
  knex("project")
    .where("projectId", req.params.id)
    .del()
    .then(() => {
      res.end("A Project is deleted");
    });
};

projectController.update = function (req, res) {
  knex("project")
    .where("projectId", req.params.id)
    .update({
      description: req.body.params.description,
      projectName: req.body.params.projectName,
      privacy: req.body.params.privacy
     })
    .then(() => {
      res.end("A project is updated");
    });
};

module.exports = projectController;