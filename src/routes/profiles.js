const profiles = require("../controllers/profiles");
const router = require("express").Router();

router.get("/", profiles.getAll);
router.get("/:id", profiles.getById);

module.exports = router;
