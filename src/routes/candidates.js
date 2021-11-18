const router = require("express").Router();
const candidates = require("../controllers/candidates");
const validations = require("../validations/candidates");

router.get("/", candidates.getAll);
router.get("/:id", candidates.getById);
router.get("/byName/:name", candidates.getByName);
router.post(
  "/",
  validations.requiredPersonalInfo,
  validations.validate,
  candidates.create,
);
router.post(
  "/education/:id",
  validations.requiredEducation,
  validations.validate,
  candidates.addEducation,
);
router.post(
  "/workExperience/:id",
  validations.requiredWorkExperience,
  validations.validate,
  candidates.addWorkExperience,
);
router.put(
  "/otherInformation/:id",
  validations.requiredOtherInformation,
  validations.validate,
  candidates.addOtherInformation,
);
router.put(
  "/:id",
  validations.requiredPersonalInfo,
  validations.requiredOtherInformation,
  validations.validate,
  candidates.update,
);
router.put(
  "/:id/education/:educationId",
  validations.requiredEducation,
  validations.validate,
  candidates.updateEducation,
);
router.put(
  "/:id/workExperience/:workExperienceId",
  validations.requiredWorkExperience,
  validations.validate,
  candidates.updateWorkExperience,
);
router.delete("/:id", candidates.remove);
router.delete("/:id/education/:educationId", candidates.removeEducation);
router.delete(
  "/:id/workExperience/:workExperienceId",
  candidates.removeWorkExperience,
);

module.exports = router;
