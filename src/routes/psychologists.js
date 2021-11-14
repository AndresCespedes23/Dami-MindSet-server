const psychologists = require("../controllers/psychologists");
const router = require("express").Router();

const middleware = require("../validations/psychologists");

router.get("/", psychologists.getAll);
router.get("/:id", psychologists.getById);
router.get("/byName/:name", psychologists.getByName);
router.post(
  "/",
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  psychologists.create
);
router.put(
  "/:id",
  middleware.dataBodyRequired,
  middleware.formatBodyRequired,
  psychologists.update
);
router.delete("/:id", psychologists.remove);

module.exports = router;
