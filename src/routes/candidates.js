const router = require("express").Router();
const candidates = require("../controllers/candidates");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, candidates.getAll);
router.get("/search", authMiddleware, candidates.search);
router.get("/:id", authMiddleware, candidates.getById);
router.post("/", candidates.create);
router.post("/education/:id", authMiddleware, candidates.addEducation);
router.post(
  "/workExperience/:id",
  authMiddleware,
  candidates.addWorkExperience,
);
router.put("/activate/:id", authMiddleware, candidates.activate);
router.put("/:id", authMiddleware, candidates.update);
router.put(
  "/:id/education/:educationId",
  authMiddleware,
  candidates.updateEducation,
);
router.put(
  "/:id/workExperience/:workExperienceId",
  authMiddleware,
  candidates.updateWorkExperience,
);
router.delete("/:id", authMiddleware, candidates.remove);
router.delete(
  "/:id/education/:educationId",
  authMiddleware,
  candidates.removeEducation,
);
router.delete(
  "/:id/workExperience/:workExperienceId",
  authMiddleware,
  candidates.removeWorkExperience,
);

module.exports = router;
