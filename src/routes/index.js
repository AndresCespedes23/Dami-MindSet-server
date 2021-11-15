const express = require("express");
const router = express.Router();

const applicationsRoutes = require("./applications");
const sessionsRoutes = require("./sessions");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");

router.use("/positions", positionsRoutes);
router.use("/applications", applicationsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router;
