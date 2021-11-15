const controller = require("../controllers/clients");
const router = require("express").Router();
const validations = require("../validations/clients");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validations.required, controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
