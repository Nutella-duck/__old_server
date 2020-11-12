const express = require("express");
const router = express.Router();

const sdkController = require("../applications/hpo/hpoSdkController.js");

router.post("/sdk", sdkController.log);
router.get("/sdk", sdkController.init);
router.post("/hpo", sdkController.hpo);

module.exports = router;
