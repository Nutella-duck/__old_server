const knex = require("../../../db/knex");

let graphController = {};

graphController.read = function (req, res) {
  var runIndex = req.params.id;
  var hpIndex = req.query.index; // 원하는 지표
  console.log(runIndex);
  knex
    .select("stepNumber", "indicator")
    .from("step")
    .where({ runId: runIndex })
    .then((result) => {
      console.log(typeof result);
      res.end(JSON.stringify(result));
    });
};

module.exports = graphController;
