const positions = require("../controllers/positions");
const validations = require("../validations/positions");
const router = require("express").Router();

router.get("/", positions.getAll);
router.get("/:id", positions.getById);
router.post(
  "/",
  validations.validateFields,
  validations.validateFieldsType,
  positions.create
);
router.put("/:id", positions.update);
router.delete("/:id", positions.remove);

module.exports = router;
