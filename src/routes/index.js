const express = require("express");
const applicationsRoutes = require("./applications");
const positionsRoutes = require("./positions");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/positions", positionsRoutes);

module.exports = router;
