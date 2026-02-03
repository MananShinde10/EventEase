const db = require("../db");

/* =======================
   CREATE BOOKING
======================= */
exports.createBooking = async (req, res) => {
    const { event_id } = req.body;
    const attendee_id = req.user.uid;

    try {
        // Check event exists & is published
        const [events] = await db.query(
            "SELECT * FROM events WHERE event_id=? AND published=1",
            [event_id]
        );

        if (events.length === 0) {
            return res.status(400).json({ message: "Event not available for booking" });
        }

        const event = events[0];

        // Create booking
        const [result] = await db.query(
            `INSERT INTO bookings 
            (event_id, attendee_id, status, total_amount)
            VALUES (?, ?, 'confirmed', ?)`,
            [event_id, attendee_id, event.base_price]
        );

        res.status(201).json({
            message: "Booking confirmed",
            booking_id: result.insertId
        });
    } catch (err) {
        console.error("Booking Error →", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET MY BOOKINGS
======================= */
exports.getMyBookings = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT b.*, e.title, e.start_datetime
             FROM bookings b
             JOIN events e ON b.event_id = e.event_id
             WHERE b.attendee_id=?`,
            [req.user.uid]
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   ADMIN – GET ALL BOOKINGS
======================= */
exports.getAllBookings = async (req, res) => {
    try {
        const [rows] = await db.query(
            `SELECT b.*, u.name AS attendee_name, e.title
             FROM bookings b
             JOIN users u ON b.attendee_id = u.user_id
             JOIN events e ON b.event_id = e.event_id`
        );

        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
