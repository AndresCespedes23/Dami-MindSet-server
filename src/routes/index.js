const express = require("express");
const candidatesRoutes = require("./candidates");
const applicationsRoutes = require("./applications");
const clientsRoutes = require("./clients");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");

const router = express.Router();

router.use("/candidates", candidatesRoutes);
router.use("/clients", clientsRoutes);
router.use("/applications", applicationsRoutes);
router.use("/positions", positionsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);

module.exports = router;
