const express = require("express");
const applicationsRoutes = require("./applications");
const psychologistsRoutes = require("./psychologists");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/psychologists", psychologistsRoutes);

module.exports = router;
