const router = require("express").Router();
const { required } = require("../validations/admins");
const applications = require("../controllers/applications");

router.get("/", applications.getAll);
router.get("/:id", applications.getById);
router.post("/", required, applications.create);
router.put("/activate/:id", applications.activate);
router.put("/:id", required, applications.update);
router.delete("/:id", applications.remove);

module.exports = router;
