const router = require("express").Router();
const applications = require("../controllers/applications");

router.get("/", applications.getAll);
router.get("/:id", applications.getById);
router.post("/", applications.create);
router.put("/activate/:id", applications.activate);
router.put("/:id", applications.update);
router.delete("/:id", applications.remove);

module.exports = router;
