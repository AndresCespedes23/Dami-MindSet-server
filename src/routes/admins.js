const admins = require("../controllers/admins");
const validations = require("../validations/admins");
const router = require("express").Router();

router.get("/", admins.getAll);
router.get("/:id", admins.getById);
router.get("/byName/:name", admins.getByName);
router.put("/:id",validations.required,admins.update);

module.exports = router;
