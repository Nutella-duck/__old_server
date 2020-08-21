const express = require("express");

const router = express.Router();

const run = require("../controllers/runController.js");

const eachrun = require("../controllers/eachrController.js");

const projectRun = require("../controllers/pjRunController.js");

router.post("/run", run.create);

router.get("/run", run.read);

router.get("/run/:id", eachrun.read);

router.get("/run/project/:id", projectRun.read);

// router.delete("/run/:id", run.delete);

router.put("/run/:id", run.update);

module.exports = router;
