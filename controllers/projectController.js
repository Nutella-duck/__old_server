const models = require("../models");

let projectController = {};

projectController.create = function (req, res) {
  models.project
    .create({
      description: req.body.description,
      projectname: req.body.projectname,
    })
    .then(() => {
      res.send("create success");
    });
};

projectController.read = function (req, res) {
  models.project.findAll({}).then((projectList) => {
    res.json(projectList);
  });
};

projectController.delete = function (req, res) {
  models.project
    .destroy({
      where: {
        projectname: req.params.id,
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
        projectname: req.body.projectname,
      },
      {
        where: {
          projectname: req.params.id,
        },
      }
    )
    .then(() => {
      res.end("update success");
    });
};

module.exports = projectController;
