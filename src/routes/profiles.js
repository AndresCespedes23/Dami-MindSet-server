const router = require("express").Router();
const profiles = require("../controllers/profiles");
const validations = require("../validations/profiles");

router.get("/", profiles.getAll);
router.get("/search", profiles.search);
router.get("/:id", profiles.getById);
router.put("/activate/:id", validations.validate, profiles.activate);
router.put("/:id", validations.validate, profiles.update);
router.post("/", validations.required, validations.validate, profiles.create);
router.delete("/:id", profiles.remove);

module.exports = router;
