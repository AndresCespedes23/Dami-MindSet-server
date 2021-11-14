const sessions = require("../controllers/sessions");
const router = require("express").Router();

router.get("/", sessions.getAll);
router.get("/:id", sessions.getById);
router.get("/ByIdPsychologist/:id", sessions.getByIdPsychologist);
router.get("/ByIdCandidate/:id", sessions.getByIdCandidate);
router.post("/", sessions.create);
router.put("/:id", sessions.update);
router.delete("/:id", sessions.remove);

module.exports = router;
