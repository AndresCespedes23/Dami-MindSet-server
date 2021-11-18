const router = require("express").Router();
const controller = require("../controllers/clients");

const middleware = require("../validations/clients");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", middleware.dataBodyRequired, controller.create);
router.put(
  "/:id",
  // middleware.formatBodyRequired,
  controller.update,
);
router.delete("/:id", controller.remove);

module.exports = router;
