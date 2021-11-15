const express = require("express");
const applicationsRoutes = require("./applications");
const clientsRoutes = require("./clients");
const positionsRoutes = require("./positions");
const profilesRoutes = require("./profiles");
const psychologistsRoutes = require("./psychologists");

const router = express.Router();

router.use("/clients", clientsRoutes);
router.use("/applications", applicationsRoutes);
router.use("/positions", positionsRoutes);
router.use("/applications", applicationsRoutes);
router.use("/profiles", profilesRoutes);
router.use("/psychologists", psychologistsRoutes);

module.exports = router;
