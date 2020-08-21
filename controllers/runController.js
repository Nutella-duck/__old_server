const models = require("../models");

let runController = {};

runController.create = function (req, res) {
  models.run
    .create({
      run_name: req.body.run_name,
      project_id: req.body.project_id,
    })
    .then(() => {
      res.send("create success");
    });
}; 

runController.read = function (req, res) {
  models.run.findAll({}).then((runList) => {
    res.json(runList);
  });
};

runController.delete = function (req, res) {
  models.run
    .destroy({
      where: {
        run_id: req.params.id,
      },
    })
    .then(() => {
      res.end("delete success");
    });
};

runController.update = function (req, res) {
  models.run
    .update(
      {
        run_name: req.body.run_name,
      },
      {
        where: {
          run_id: req.params.id,
        },
      }
    )
    .then(() => {
      res.end("update success");
    });
};

module.exports = runController;
