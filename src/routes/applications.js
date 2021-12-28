const router = require("express").Router();
const { required } = require("../validations/applications");
const applications = require("../controllers/applications");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, applications.getAll);
router.get("/:id", authMiddleware, applications.getById);
router.post("/", authMiddleware, required, applications.create);
router.put("/activate/:id", authMiddleware, applications.activate);
router.put("/:id", authMiddleware, required, applications.update);
router.delete("/:id", authMiddleware, applications.remove);

module.exports = router;
