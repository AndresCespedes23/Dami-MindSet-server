const router = require("express").Router();
const positions = require("../controllers/positions");
const validations = require("../validations/positions");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", positions.getAll);
router.get("/client/:id", authMiddleware, positions.getClientPositions);
router.get("/:id", authMiddleware, positions.getById);
router.post(
  "/",
  authMiddleware,
  validations.required,
  validations.validate,
  positions.create,
);
router.put("/activate/:id", authMiddleware, positions.activate);
router.put("/:id", authMiddleware, validations.validate, positions.update);
router.delete("/:id", authMiddleware, positions.remove);

module.exports = router;
