const express = require("express");
const router = express.Router();

const applicationsRoutes = require("./applications");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");
const clientsRoutes = require("./clients");
const sessionsRoutes = require("./sessions");

router.use("/applications", applicationsRoutes);
router.use("/clients", clientsRoutes);
router.use("/positions", positionsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router;
