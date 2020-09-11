const knex = require("../../../db/knex");

let graphController = {};

graphController.read = function (req, res) {
    var runIndex = req.params.id;
    var hpIndex = req.body.params.index; // 원하는 지표

    knex("step")
        .where("step.runId", runIndex)
        .select("step.stepId", "run.runName", "step.stepNumber", hpIndex)
        .leftJoin("run", "step.runId", "run.runId")
        .then((graphList) => {
            res.json(graphList);
        }); 
}

module.exports = graphController;