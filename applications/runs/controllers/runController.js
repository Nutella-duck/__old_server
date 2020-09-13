const knex = require("../../../db/knex");

let runController = {};

runController.read = function (req, res) {
  knex("run")
    .select()
    .where({
      "run.projectId": req.params.id,
      "step.stepNumber": 1
    })
    .leftJoin("step", "run.runId", "step.runId")
    .then((runList) => {
    res.json(runList);
  });
};

runController.delete = function (req, res) {
  knex("run")
    .where("runId", req.params.id)
    .del()
    .then(() => {
      res.end("A run is deleted");
    });
};

runController.update = function (req, res) {
  knex("run")
    .where("runId", req.params.id)
    .update({
      runName: req.body.params.runName,
    })
    .then(() => {
      res.end("A run is updated");
    });
};

module.exports = runController;
