const router = require("express").Router();
const admins = require("../controllers/admins");
const validations = require("../validations/admins");

router.get("/", admins.getAll);
router.get("/:id", admins.getById);
router.get("/byName/:name", admins.getByName);
router.put("/:id", validations.required, admins.update);
router.post("/", admins.create);
router.delete("/:id", admins.remove);

module.exports = router;
