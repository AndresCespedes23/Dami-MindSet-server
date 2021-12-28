const express = require("express");

const router = express.Router();
const candidatesRoutes = require("./candidates");
const applicationsRoutes = require("./applications");
const adminsRoutes = require("./admins");
const clientsRoutes = require("./clients");
const interviewsRoutes = require("./interviews");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");
const sessionsRoutes = require("./sessions");
const authRoutes = require("./auth");

router.use("/api/candidates", candidatesRoutes);
router.use("/api/applications", applicationsRoutes);
router.use("/api/interviews", interviewsRoutes);
router.use("/api/clients", clientsRoutes);
router.use("/api/positions", positionsRoutes);
router.use("/api/applications", applicationsRoutes);
router.use("/api/admins", adminsRoutes);
router.use("/api/profiles", profilesRoutes);
router.use("/api/psychologists", psychologistsRoutes);
router.use("/api/sessions", sessionsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
