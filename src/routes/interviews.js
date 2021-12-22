const router = require("express").Router();
const interviews = require("../controllers/interviews");
const validations = require("../validations/interviews");

router.post("/", validations.required, validations.validateAdd, interviews.create);
router.put(
  "/:id",
  validations.required,
  validations.validateUpdate,
  interviews.update,
);
router.put("/activate/:id", interviews.activate);
router.delete("/:id", interviews.remove);
router.get("/", interviews.getAll);
router.get("/:id", interviews.getById);

module.exports = router;
