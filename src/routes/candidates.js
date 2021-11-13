const candidates = require("../controllers/candidates");
const router = require("express").Router();

router.get("/", candidates.getAll);
router.get("/byId/:id", candidates.getById);
router.get("/byName/:name", candidates.getByName);
router.post("/", candidates.create);
router.put("/:id", candidates.update);
router.delete("/:id", candidates.remove);

module.exports = router;
