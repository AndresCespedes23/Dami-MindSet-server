const router = require("express").Router();
const profiles = require("../controllers/profiles");
const validations = require("../validations/profiles");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, profiles.getAll);
router.get("/search", authMiddleware, profiles.search);
router.get("/:id", authMiddleware, profiles.getById);
router.put("/activate/:id", authMiddleware, validations.validate, profiles.activate);
router.put("/:id", authMiddleware, validations.validate, profiles.update);
router.post("/", authMiddleware, validations.required, validations.validate, profiles.create);
router.delete("/:id", authMiddleware, profiles.remove);

module.exports = router;
