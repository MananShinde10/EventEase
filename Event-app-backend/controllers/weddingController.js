// controllers/weddingController.js
const db = require("../db");

/**
 * POST /api/weddings/book
 * Attendee books a wedding event
 */
exports.bookWedding = async (req, res) => {
  const attendeeId = req.user.uid;

  const {
    event_id,
    package_id,
    total_amount,
    notes
  } = req.body;

  try {
    // 1️⃣ Validate wedding event
    const [eventRows] = await db.query(
      `SELECT e.event_id, c.category_name
       FROM events e
       JOIN event_categories c ON e.category_id = c.category_id
       WHERE e.event_id = ?`,
      [event_id]
    );

    if (eventRows.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (eventRows[0].category_name !== "wedding") {
      return res.status(400).json({ message: "Not a wedding event" });
    }

    // 2️⃣ Create booking
    await db.query(
      `INSERT INTO bookings
       (event_id, attendee_id, status, total_amount, notes)
       VALUES (?, ?, 'confirmed', ?, ?)`,
      [event_id, attendeeId, total_amount, notes || null]
    );

    res.status(201).json({
      message: "Wedding booked successfully"
    });

  } catch (err) {
    console.error("Wedding booking error →", err);
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};
