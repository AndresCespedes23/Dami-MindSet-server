const admins = require("../controllers/admins");
const router = require("express").Router();

router.get("/", admins.getAll);
router.get("/:id", admins.getById);
router.get("/:name", admins.getByName);
router.put("/:id", admins.update);

module.exports = router;