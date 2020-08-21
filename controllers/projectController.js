const models = require("../models");
var generateSafeId = require('generate-safe-id');

let projectController = {};

projectController.create = function (req, res) {
  models.project
    .create({
      description: req.body.description,
      project_name: req.body.project_name,
      privacy: req.body.privacy,
      api_key : generateSafeId(),
    })
    .then(() => {
      res.send("A project is created");
    });
};

projectController.read = function (req, res) {
  let pageNum = req.body.page;
  let offset = 0;
  if(pageNum >1){
      offset = 6 * (pageNum-1);
  }

  models.project
  .findAll({
    offset: offset,
    limit : 6,
  }).then((projectList) => {
    res.json(projectList);
  });
};

projectController.delete = function (req, res) {
  models.project
    .destroy({
      where: {
        project_id: req.params.id,
      },
    })
    .then(() => {
      res.end("delete success");
    });
};

projectController.update = function (req, res) {
  models.project
    .update(
      {
        description: req.body.description,
        project_name: req.body.project_name,
      },
      {
        where: {
          project_id: req.params.id,
        },
      }
    )
    .then(() => {
      res.end("update success");
    });
};

module.exports = projectController;
