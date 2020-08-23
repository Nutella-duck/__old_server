const models = require("../models");
const { Sequelize, sequelize } = require("../models");

let eachpjController = {};

eachpjController.read = function (req, res) {
    models.run
    .findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('project_id')), 'total_run']],
        where: { 
            project_id: req.params.id,
        },
    })
    .then((projectList) => {
      res.json(projectList); 
    });
};

module.exports = eachpjController;
