const sessions = require("../controllers/sessions");
const validations = require("../validations/sessions");
const router = require("express").Router();

router.get("/", sessions.getAll);
router.get("/:id", sessions.getById);
router.get("/ByIdPsychologist/:id", sessions.getByIdPsychologist);
router.get("/ByIdCandidate/:id", sessions.getByIdCandidate);
router.post("/", validations.required, validations.validate, sessions.create);
router.put("/:id", validations.validate, sessions.update);
router.delete("/:id", sessions.remove);

module.exports = router;
