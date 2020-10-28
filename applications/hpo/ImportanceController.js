let importanceController = {};

importanceController.read = async (req, res) => {
  res.end(`{
    "parmeter": "string",
    "configParmeter": "string",
    "importance": 0,
    "Correlation": 0
  }`);
};

module.exports = importanceController;
