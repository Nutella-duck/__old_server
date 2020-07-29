const express = require("express");

const router = express.Router();

const project = require("../controllers/projectController.js");

router.post("/project", project.create);

router.get("/project", project.read);

router.delete("/project/:id", project.delete);

router.put("/project/:id", project.update);

module.exports = router;
