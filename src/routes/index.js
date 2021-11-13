const express = require("express");
const candidatesRoutes = require("./candidates");
const applicationsRoutes = require("./applications");
const router = express.Router();

router.use("/candidates", candidatesRoutes);
router.use("/applications", applicationsRoutes);

module.exports = router;
