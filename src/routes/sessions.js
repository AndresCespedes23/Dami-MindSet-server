const router = require("express").Router();
const sessions = require("../controllers/sessions");
const validations = require("../validations/sessions");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, sessions.getAll);
router.get("/:id", authMiddleware, sessions.getById);
router.post("/", authMiddleware, validations.required, validations.validate, sessions.create);
router.put("/activate/:id", authMiddleware, validations.validate, sessions.activate);
router.put("/:id", authMiddleware, sessions.update);
router.delete("/:id", authMiddleware, sessions.remove);

module.exports = router;
