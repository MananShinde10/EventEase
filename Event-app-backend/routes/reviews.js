// routes/reviews.js
const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authMiddleware");

// Add review
router.post("/", verifyToken, reviewController.addReview);

// Get reviews for event/vendor/service
router.get("/:targetType/:targetId", reviewController.getReviewsByTarget);

// My reviews
router.get("/my/reviews", verifyToken, reviewController.getMyReviews);

module.exports = router;
