const express = require("express");
const applicationsRoutes = require("./applications");
const adminsRoutes = require("./admins");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("./admins", adminsRoutes);

module.exports = router;
