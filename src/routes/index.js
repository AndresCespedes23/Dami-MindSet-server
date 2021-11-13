const express = require("express");
const applicationsRoutes = require("./applications");
const router = express.Router();

router.use("/applications", applicationsRoutes);

module.exports = router;
