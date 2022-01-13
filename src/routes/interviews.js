const router = require("express").Router();
const interviews = require("../controllers/interviews");
const validations = require("../validations/interviews");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/",
  authMiddleware,
  validations.required,
  validations.validate,
  interviews.create,
);
router.put(
  "/:id",
  authMiddleware,
  validations.required,
  validations.validate,
  interviews.update,
);
router.put("/activate/:id", authMiddleware, interviews.activate);
router.delete("/:id", authMiddleware, interviews.remove);
router.get("/", authMiddleware, interviews.getAll);
router.get("/:id", authMiddleware, interviews.getById);
router.get("/pending/:id", authMiddleware, interviews.getPending);
router.get("/completed/:id", authMiddleware, interviews.getCompleted);

module.exports = router;
