const express = require("express");
const router = express.Router();

const candidatesRoutes = require("./candidates");
const applicationsRoutes = require("./applications");
const interviewsRoutes = require("./interviews");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");
const clientsRoutes = require("./clients");
const sessionsRoutes = require("./sessions");

router.use("/candidates", candidatesRoutes);
router.use("/applications", applicationsRoutes);
router.use("/interviews", interviewsRoutes);
router.use("/clients", clientsRoutes);
router.use("/positions", positionsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router;
