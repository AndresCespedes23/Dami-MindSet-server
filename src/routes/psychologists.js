const router = require("express").Router();
const psychologists = require("../controllers/psychologists");

const middleware = require("../validations/psychologists");

router.get("/", psychologists.getAll);
router.get("/:id", psychologists.getById);
router.get("/byName/:name", psychologists.getByName);
router.post(
  "/",
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  psychologists.create,
);
router.put("/activate/:id", psychologists.activate);
router.put(
  "/:id",
  // middleware.formatBodyRequired,
  psychologists.update,
);
router.delete("/:id", psychologists.remove);

module.exports = router;
