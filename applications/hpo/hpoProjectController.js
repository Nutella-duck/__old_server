const hpoRunController = require("./hpoRunController");

let hpoProjectController = {};

hpoProjectController.read = async (req, res) => {
  res.end(`[{
        "hpoName": "string",
        "description": "string",
        "createBy": "string"
      }]`);
};

hpoProjectController.bestResult = async (req, res) => {
  res.end(`{
    "bestParmeter": {}
  }`);
};

module.exports = hpoProjectController;
