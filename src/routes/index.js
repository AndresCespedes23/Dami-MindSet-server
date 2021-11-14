const express = require("express");
const applicationsRoutes = require("./applications");
const sessionsRoutes = require("./sessions");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/sessions", sessionsRoutes);

module.exports = router;
