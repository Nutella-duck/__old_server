var express = require("express");

var router = express.Router();

var project = require("../controllers/projectController.js");

router.post("/product/create", project.create);

module.exports = router;
