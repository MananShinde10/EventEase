// controllers/reviewController.js
const db = require("../db");

/* =========================
   ADD REVIEW
========================= */
exports.addReview = async (req, res) => {
    const { target_type, target_id, rating, title, comments } = req.body;
    const reviewer_id = req.user.uid;

    try {
        // Basic validation
        if (!["event", "vendor", "venue", "service"].includes(target_type)) {
            return res.status(400).json({ message: "Invalid target type" });
        }

        // Optional: prevent duplicate review
        const [existing] = await db.query(
            `SELECT review_id FROM reviews 
             WHERE target_type=? AND target_id=? AND reviewer_id=?`,
            [target_type, target_id, reviewer_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ message: "You already reviewed this item" });
        }

        await db.query(
            `INSERT INTO reviews 
            (target_type, target_id, reviewer_id, rating, title, comments)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [target_type, target_id, reviewer_id, rating, title, comments]
        );

        res.status(201).json({ message: "Review added successfully" });

    } catch (err) {
        console.error("Add Review Error →", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   GET REVIEWS BY TARGET
========================= */
exports.getReviewsByTarget = async (req, res) => {
    const { targetType, targetId } = req.params;

    try {
        const [rows] = await db.query(
            `SELECT r.*, u.name AS reviewer_name
             FROM reviews r
             JOIN users u ON r.reviewer_id = u.user_id
             WHERE r.target_type=? AND r.target_id=?
             ORDER BY r.created_at DESC`,
            [targetType, targetId]
        );

        res.json(rows);
    } catch (err) {
        console.error("Get Reviews Error →", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   GET MY REVIEWS
========================= */
exports.getMyReviews = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM reviews WHERE reviewer_id=?",
            [req.user.uid]
        );

        res.json(rows);
    } catch (err) {
        console.error("My Reviews Error →", err);
        res.status(500).json({ message: "Server error" });
    }
};
