var models = require("../models");

var projectController = {};

projectController.create = function (req, res) {
  console.log(req.body);
  models.project
    .create({
      decription: req.body.decription,
      lastmodification: req.body.lastmodification,
      createdtime: req.body.createdtime,
      projectname: req.body.projectname,
    })
    .then(() => {
      res.send("hello");
    });
};

module.exports = projectController;
