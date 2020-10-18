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
      // runName: name
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

module.exports = sdkController;
