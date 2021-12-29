const router = require("express").Router();
const psychologists = require("../controllers/psychologists");
const middleware = require("../validations/psychologists");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, psychologists.getAll);
router.get("/search", authMiddleware, psychologists.search);
router.get("/:id", authMiddleware, psychologists.getById);
router.post(
  "/",
  authMiddleware,
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  psychologists.create,
);
router.put("/activate/:id", authMiddleware, psychologists.activate);
router.put(
  "/:id",
  authMiddleware,
  // middleware.formatBodyRequired,
  psychologists.update,
);
router.delete("/:id", authMiddleware, psychologists.remove);

module.exports = router;
