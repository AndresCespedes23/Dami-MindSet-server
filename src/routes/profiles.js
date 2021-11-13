const profiles = require("../controllers/profiles");
const validations = require("../validations/profiles");
const router = require("express").Router();

router.get("/", profiles.getAll);
router.get("/:id", profiles.getById);
router.put("/:id", validations.validate, profiles.update);
router.post("/", validations.validate, validations.required, profiles.create);
router.delete("/:id", profiles.remove);

module.exports = router;
