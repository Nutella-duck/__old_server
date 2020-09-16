const express = require("express");
const router = express.Router();

const graph = require("../applications/runs/controllers/graphController.js");

// graph 그리기 위한
router.get("/graph/:id", graph.read);

module.exports = router;
