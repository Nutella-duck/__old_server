const knex = require("../../db/knex");

let sdkController = {};

sdkController.create = function (req, res) {
  let data = req.body
  let name = data['run_name'];
  delete data.runName;
  data = JSON.stringify(data)

  console.log(data)
  knex("step")
    .insert({ 
      indicator: data,
      stepNumber: 0,
      runId: 1
      // runId랑 stepNumber 수정하고, indicator 여러개 들어갔을 때 잘라서 넣기 수정
    })
    .then(() => {
      res.end("step test");
    });
};

sdkController.read = function (req, res) {
  knex("project")
    .where("project.apiKey", req.query.id)
    .select("project.projectId")
    .then((projectId) => {
      res.json(projectId);
  });
};


// cofig 저장된 거 분리해서 보내주기

module.exports = sdkController;
