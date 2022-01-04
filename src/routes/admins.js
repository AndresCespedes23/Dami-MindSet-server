const router = require("express").Router();
const admins = require("../controllers/admins");
const validations = require("../validations/admins");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, admins.getAll);
router.get("/search", authMiddleware, admins.search);
router.get("/:id", authMiddleware, admins.getById);
router.put("/:id", authMiddleware, validations.required, admins.update);
router.post("/", authMiddleware, validations.required, admins.create);
module.exports = router;
