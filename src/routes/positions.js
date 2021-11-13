const positions = require("../controllers/positions");
const router = require("express").Router();

router.get("/", positions.getAll);
router.get("/:id", positions.getById);
router.post("/", positions.create);
router.put("/:id", positions.update);
router.delete("/:id", positions.remove);

module.exports = router;
