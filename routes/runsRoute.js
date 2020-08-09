const express = require("express");

const router = express.Router();

const runs = require("../controllers/runsController.js");

//router.post("/runs", runs.create);

router.get("/runs", runs.read);

// router.delete("/runs/:id", runs.delete);

router.put("/runs/:id", runs.update);

module.exports = router;
