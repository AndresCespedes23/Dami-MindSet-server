const router = require("express").Router();
const admins = require("../controllers/admins");
const validations = require("../validations/admins");
// const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", admins.getAll);
router.get("/search", admins.search);
router.get("/:id", admins.getById);
router.put("/:id", validations.required, admins.update);

module.exports = router;
