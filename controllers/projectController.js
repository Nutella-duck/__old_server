const knex = require("../db/knex");
var generateSafeId = require("generate-safe-id");

let projectController = {};

projectController.create = function (req, res) {
  knex('project')
    .insert({
    description: req.body.description,
    projectName: req.body.projectName,
    privacy: req.body.privacy,
    api_key: req.body.api_key,
    })
    .then(() => {
      res.send("A project is created");
    });
};

// projectController.read = function (req, res) {
//   let pageNum = req.body.page;
//   let offset = 0;
//   if (pageNum > 1) {
//     offset = 6 * (pageNum - 1);
//   }

//   knex('project').select
//     .findAll({
//       offset: offset,
//       limit: 6,
//     })
//     .then((projectList) => {
//       res.json(projectList);
//     });
// };

// projectController.getkey = function (req, res) {
//   res.send(generateSafeId());
// };

// projectController.delete = function (req, res) {
//   models.project
//     .destroy({
//       where: {
//         project_id: req.params.id,
//       },
//     })
//     .then(() => {
//       res.end("delete success");
//     });
// };

// projectController.update = function (req, res) {
//   models.project
//     .update(
//       {
//         description: req.body.description,
//         project_name: req.body.project_name,
//       },
//       {
//         where: {
//           project_id: req.params.id,
//         },
//       }
//     )
//     .then(() => {
//       res.end("update success");
//     });
// };

module.exports = projectController;
