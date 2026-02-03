// routes/weddings.js
const express = require("express");
const router = express.Router();

const { verifyToken, verifyRole } = require("../middleware/authMiddleware");
const weddingController = require("../controllers/weddingController");

// Attendee books a wedding
router.post(
  "/book",
  verifyToken,
  verifyRole("attendee"),
  weddingController.bookWedding
);

module.exports = router;
