// const knex = require("../../../db/knex");

// let graphController = {};

// graphController.read = function (req, res) {
//     var index = req.body.params.index; // 원하는 지표

//     knex("projectInfo")
//         .select("runName", "state") // time, prjectname
//         .limit(10).offset(offset)  
//         .then((graphList) => {
//             res.json(graphList);
//         }); 
// }

// module.exports = graphController;