const models = require("../models");

let runController = {};

// runController.create = function (req, res) {
//   models.run
//     .create({
//       run_name: "testbeforesdk" //req.body.run_name,
//       state: "none",
//       project_name: "test",
//     })
//     .then(() => {
//       res.send("create success");
//     });
// }; 


runController.read = function (req, res) {
  models.run.findAll({}).then((runList) => {
    res.json(runList);
  });
};

// runController.delete = function (req, res) {
//   models.run
//     .destroy({
//       where: {
//         run_name: req.params.id,
//       },
//     })
//     .then(() => {
//       res.end("delete success");
//     });
// };

runController.update = function (req, res) {
  models.run
    .update(
      {
        run_name: req.body.run_name,
      },
      {
        where: {
          run_name: req.params.id,
        },
      }
    )
    .then(() => {
      res.end("update success");
    });
};

module.exports = runController;
