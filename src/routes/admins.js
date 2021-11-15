const admins = require("../controllers/admins");
const validations = require("../validations/admins");
const router = require("express").Router();

router.get("/", admins.getAll);
router.get("/:id", admins.getById);
router.get("/byName/:name", admins.getByName);
router.put("/:id",validations.validate, admins.update);//MISSING VALIDATION ON UPDATE

module.exports = router;
