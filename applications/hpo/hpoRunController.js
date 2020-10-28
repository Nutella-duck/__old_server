let hpoRunController = {};

hpoRunController.read = async (req, res) => {
  res.end(`[
        {
          "target": {},
          "config": {},
          "runName": "string"
        }
      ]`);
};

module.exports = hpoRunController;
