const knex = require("../../db/knex");

let sdkController = {};

sdkController.create = function (req, res) {
  let data = JSON.stringify(req.body);
  console.log(data);
  console.log(typeof data);
  knex("step")
    .insert({ indicator: data })
    .then(() => {
      res.end("step test");
    });
};

module.exports = sdkController;
