const models = require("../models");

let runsController = {};

// runsController.create = function (req, res) {
//   models.runs
//     .create({
//       modelName: "testbeforesdk" //req.body.runsname,
//       state: "none",
//       projectname: "test",
//     })
//     .then(() => {
//       res.send("create success");
//     });
// }; 


runsController.read = function (req, res) {
  models.runs.findAll({}).then((runsList) => {
    res.json(runsList);
  });
};

// runsController.delete = function (req, res) {
//   models.runs
//     .destroy({
//       where: {
//         runsname: req.params.id,
//       },
//     })
//     .then(() => {
//       res.end("delete success");
//     });
// };

runsController.update = function (req, res) {
  models.runs
    .update(
      {
        runsname: req.body.runsname,
      },
      {
        where: {
          runsname: req.params.id,
        },
      }
    )
    .then(() => {
      res.end("update success");
    });
};

module.exports = runsController;
