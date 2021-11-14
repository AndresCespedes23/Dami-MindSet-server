const express = require("express");
const applicationsRoutes = require("./applications");
const clientsRoutes = require("./clients");
const router = express.Router();

router.use("/applications", applicationsRoutes);
router.use("/clients", clientsRoutes);

module.exports = router;
