const router = require("express").Router();
const statistics = require("../controllers/statistics");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/quantity", authMiddleware, statistics.getQuantity);

module.exports = router;
