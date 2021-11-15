const express = require("express");
const applicationsRoutes = require("./applications");
const interviewsRoutes = require("./interviews");
const router = express.Router();
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");

router.use("/applications", applicationsRoutes);
router.use("/interviews", interviewsRoutes);
router.use("/positions", positionsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);

module.exports = router;
