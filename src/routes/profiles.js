const profiles = require("../controllers/profiles");
const router = require("express").Router();

router.get("/", profiles.getAll);

module.exports = router;