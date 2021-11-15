const express = require("express");
const applicationsRoutes = require("./applications");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/positions", positionsRoutes);
router.use("/applications", applicationsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);

module.exports = router;
