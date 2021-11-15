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
  middleware.dataBodyUnique,
  psychologists.create
);
router.patch(
  "/:id",
  middleware.formatBodyRequired,
  middleware.dataBodyUnique,
  psychologists.update
);
router.delete("/:id", psychologists.remove);

module.exports = router;
