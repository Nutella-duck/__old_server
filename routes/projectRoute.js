const express = require("express");

const router = express.Router();

const project = require("../controllers/projectController.js");

const eachproject = require("../controllers/eachpjController.js");

router.post("/project", project.create);

router.get("/project/key", project.getkey);

router.get("/project", project.read);

router.get("/project/:id", eachproject.read);

router.delete("/project/:id", project.delete);

router.put("/project/:id", project.update);

module.exports = router;
