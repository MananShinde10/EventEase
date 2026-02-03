const db = require("../db");

/* =========================
   CREATE EVENT
========================= */
exports.createEvent = async (req, res) => {
    const {
        category_id,
        subcategory_id,
        package_id,
        title,
        description,
        start_datetime,
        end_datetime,
        capacity,
        base_price
    } = req.body;

    try {
        let status = "draft";
        let published = false;

        // 🔥 ADMIN EVENTS → DIRECTLY PUBLISHED
        if (req.user.role === "admin") {
            status = "published";
            published = true;
        }

        const [result] = await db.query(
            `INSERT INTO events
            (organizer_id, category_id, subcategory_id, package_id, title, description,
             start_datetime, end_datetime, capacity, base_price, status, published)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.user.uid,
                category_id,
                subcategory_id,
                package_id,
                title,
                description,
                start_datetime,
                end_datetime,
                capacity || null,
                base_price || 0,
                status,
                published
            ]
        );

        res.status(201).json({
            message: "Event created successfully",
            event_id: result.insertId,
            status,
            published
        });

    } catch (err) {
        console.error("Create Event Error →", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

/* =========================
   GET ALL PUBLISHED EVENTS
   (Public / Attendee)
========================= */
exports.getAllEvents = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM events WHERE published = true"
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   GET EVENT BY ID
========================= */
exports.getEventById = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM events WHERE event_id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   ADMIN APPROVES EVENT
========================= */
exports.approveEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query(
            `UPDATE events 
             SET status='published', published=true 
             WHERE event_id=?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json({ message: "Event approved and published" });

    } catch (err) {
        console.error("Approve Event Error →", err);
        res.status(500).json({ message: "Server error" });
    }
};

/* =========================
   DELETE EVENT
========================= */
exports.deleteEvent = async (req, res) => {
    try {
        await db.query("DELETE FROM events WHERE event_id=?", [req.params.id]);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
