const knex = require("../../../db/knex");

let runCardController = {};

// 10개였는지 확인하기
runCardController.read = function (req, res) {
    let pageNum = req.body.params.page;
    let offset = pageNum > 1 ? 10 * (pageNum - 1) : 0;
  
    knex("run")
      .select("runName", "state") // time, prjectname
      .limit(10).offset(offset)  
      .then((projectList) => {
        res.json(projectList);
      });
}

module.exports = runCardController;