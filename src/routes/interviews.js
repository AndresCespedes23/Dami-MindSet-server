const interviews = require("../controllers/interviews");
const validations = require("../validations/interviews");
const router = require("express").Router();

router.post("/", validations.require, validations.validate, interviews.create);
router.put(
  "/:id",
  validations.require,
  validations.validate,
  interviews.update
);
router.delete("/:id", interviews.remove);
router.get("/", interviews.getAll);
router.get("/:id", interviews.getById);

module.exports = router;
