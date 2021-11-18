const router = require("express").Router();
const interviews = require("../controllers/interviews");
const validations = require("../validations/interviews");

router.post("/", validations.required, validations.validate, interviews.create);
router.put(
  "/:id",
  validations.required,
  validations.validate,
  interviews.update,
);
router.delete("/:id", interviews.remove);
router.get("/", interviews.getAll);
router.get("/:id", interviews.getById);

module.exports = router;
