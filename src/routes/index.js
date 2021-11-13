const express = require("express");
const applicationsRoutes = require("./applications");
const profilesRoutes = require("./profiles");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/profiles", profilesRoutes);

module.exports = router;
