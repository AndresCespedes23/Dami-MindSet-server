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
router.post(
  "/workExperience/:id",
  validations.requiredWorkExperience,
  candidates.addWorkExperience
);
router.put(
  "/otherInformation/:id",
  validations.requiredOtherInformation,
  candidates.addOtherInformation
);
router.put("/:id", candidates.update);
router.put("/education/:id", candidates.updateEducation);
router.delete("/:id", candidates.remove);

router.put("/test/test", validations.validate);

module.exports = router;
