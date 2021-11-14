const candidates = require("../controllers/candidates");
const validations = require("../validations/candidates");
const router = require("express").Router();

router.get("/", candidates.getAll);
router.get("/byId/:id", candidates.getById);
router.get("/byName/:name", candidates.getByName);
router.post("/", validations.requiredPersonalInfo, candidates.create);
router.post(
  "/education/:id",
  validations.requiredEducation,
  candidates.addEducation
);
router.put("/:id", candidates.update);
router.delete("/:id", candidates.remove);

module.exports = router;
