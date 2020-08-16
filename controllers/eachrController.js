const models = require("../models");

let eachrController = {};

eachrController.read = function (req, res) {
    models.run
    .findAll({
        where: { 
            run_name: req.params.id,
        },
    })
    .then((runList) => {
      res.json(runList);
    });
  };

module.exports = eachrController;
