const router = require("express").Router();
const controller = require("../controllers/clients");
const middleware = require("../validations/clients");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, controller.getAll);
router.get("/disabled", authMiddleware, controller.getAllDisabled);
router.get("/search", authMiddleware, controller.search);
router.get("/:id", authMiddleware, controller.getById);
router.post(
  "/",
  authMiddleware,
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  controller.create,
);
router.put("/activate/:id", authMiddleware, controller.activate);
router.put(
  "/:id",
  authMiddleware,
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  controller.update,
);
router.delete("/:id", authMiddleware, controller.remove);

module.exports = router;
