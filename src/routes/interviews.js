const interviews = require("../controllers/interviews");
const router = require("express").Router();

router.post("/", interviews.create);
router.put("/:id", interviews.update);
router.delete("/:id", interviews.remove);
router.get("/", interviews.getAll);
router.get("/:id", interviews.getById);

module.exports = router;
