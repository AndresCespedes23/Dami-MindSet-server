const positions = require("../controllers/positions");
const validations = require("../validations/positions");
const router = require("express").Router();

router.get("/", positions.getAll);
router.get("/:id", positions.getById);
router.post("/", validations.required, validations.validate, positions.create);
router.put("/:id", validations.required, validations.validate, positions.update);
router.delete("/:id", positions.remove);

module.exports = router;
