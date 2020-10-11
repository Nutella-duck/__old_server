const express = require("express");
const router = express.Router();

const sdkController = require("../applications/sdk/sdkController.js");

router.post("/sdk", sdkController.create);

module.exports = router;
