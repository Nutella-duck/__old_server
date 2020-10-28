const express = require("express");
const router = express.Router();

const hpoProjectController = require("../applications/hpo/hpoProjectController");
const hpoRunController = require("../applications/hpo/hpoRunController");
const importanceController = require("../applications/hpo/ImportanceController");

router.get("/hpo/hpoProject", hpoProjectController.read);
router.get("/hpo/bestResult/:id", hpoProjectController.bestResult);
router.get("/hpo/importance/:id", importanceController.read);

router.get("/hpo/result/:id", hpoRunController.read);

module.exports = router;
