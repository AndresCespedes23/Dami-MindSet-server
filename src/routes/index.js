const express = require("express");
const applicationsRoutes = require("./applications");
const interviewsRoutes = require("./interviews");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/interviews", interviewsRoutes);

module.exports = router;
