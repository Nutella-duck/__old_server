const knex = require("../../../db/knex");
const { subscribe } = require("../../../routes/runRoute");

let projectCardController = {};

projectCardController.read = function (req, res) {
    let pageNum = req.body.params.page;
    let offset = pageNum > 1 ? 6 * (pageNum - 1) : 0;
    var subquery = knex
                    .select("project.projectId", "project.projectName", "project.privacy", "project.description")
                    .from("project")
                    .join("run", "project.projectId", "run.projectId").as("results");

    // var subquery2 = knex
    //                   .select("projectId", "projectName", "privacy", "description")
    //                   .from("project").as("asdff")                 
    //.from(subquery).groupBy("projectId").as("sdf");
    
    knex
      .select()
      .from("project")
      .limit(6).offset(offset) //name, des, totalrun, privacy, time
      .then((projectList) => {
        res.json(projectList);
      });
};

// select *, count(*) as totalRun
// from ( 
// 	select project.projectId, project.projectName from project join run on project.projectId = run.projectId
// ) as prj
// group by projectId;

// .select("*", function(){
//   this
//     .count("*")
//     .from(subquery)
//     //.groupBy("projectId")
//     .as("totalRun")
// })
// .from(subquery)
// .groupBy("projectId")


module.exports = projectCardController;