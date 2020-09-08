const knex = require("../../../db/knex");

let runController = {};

// 이거는 여기에 있을 필요 x test용
runController.create = function (req, res) {
  knex("run")
    .insert({
      runName: req.body.params.runName,
      projectId: req.body.params.projectId,
      //state: req.body.params.state,
    }) // 다른 log 어떻게 되어있는지 확인하고 추가
    .then(() => {
      res.send("A run is created");
    });
};

runController.read = function (req, res) {
  knex("run")
    .select() // name, state, time, by, runtime, 지표, h.p
    .where("projectId", req.params.id)
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
