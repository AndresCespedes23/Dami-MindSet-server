const profiles = require("../controllers/profiles");
const router = require("express").Router();

router.get("/", profiles.getAll);
router.get("/:id", profiles.getById);
router.put("/:id", profiles.update);

module.exports = router;
