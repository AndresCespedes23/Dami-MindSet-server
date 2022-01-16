const router = require("express").Router();
const sessions = require("../controllers/sessions");
const validations = require("../validations/sessions");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, sessions.getAll);
router.get("/available/:id", authMiddleware, sessions.getAvailable);
router.get("/postulant/:id", authMiddleware, sessions.getPostulantSessions);
router.get("/psychologist/:id", authMiddleware, sessions.getPsychologistSessions);
router.get("/:id", authMiddleware, sessions.getById);
router.post("/", authMiddleware, validations.required, validations.validate, sessions.create);
router.put("/activate/:id", authMiddleware, validations.validate, sessions.activate);
router.put("/remove/:id", authMiddleware, sessions.remove);
router.put("/:id", authMiddleware, sessions.update);

module.exports = router;
