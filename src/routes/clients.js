const router = require("express").Router();
const controller = require("../controllers/clients");

const middleware = require("../validations/clients");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  controller.create,
);
router.put("/activate/:id", controller.activate);
router.put(
  "/:id",
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  controller.update,
);
router.delete("/:id", controller.remove);

module.exports = router;
