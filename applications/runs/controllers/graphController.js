const knex = require("../../../db/knex");

let graphController = {};

graphController.read = function (req, res) {
    let pageNum = req.body.params.page;
    let offset = pageNum > 1 ? 10 * (pageNum - 1) : 0;
  
    knex("run")
      .select("runName", "state") // time, prjectname
      .limit(10).offset(offset)  
      .then((projectList) => {
        res.json(projectList);
      });
}

module.exports = graphController;