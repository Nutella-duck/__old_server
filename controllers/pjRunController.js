const models = require("../models");

let pjRunController = {};

pjRunController.read = function (req, res) {
    let pageNum = req.body.page;
    let offset = 0;
    if(pageNum >1){
        offset = 3 * (pageNum-1);
    }

    models.run
    .findAll({
        where: { 
            project_id : req.params.id,
        },
        offset: offset,
        limit : 3,
    })
    .then((runList) => {
      res.json(runList);
    });
};

module.exports = pjRunController;
