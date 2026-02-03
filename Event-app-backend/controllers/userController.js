const db = require("../db");

/* =======================
   GET ALL USERS (ADMIN)
======================= */
exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM users");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   DELETE USER (ADMIN)
======================= */
exports.deleteUser = async (req, res) => {
    try {
        const [result] = await db.query(
            "DELETE FROM users WHERE user_id=?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   REQUEST ROLE UPGRADE (USER)
======================= */
exports.requestRoleUpgrade = async (req, res) => {
    const { role } = req.body;
    const userId = req.user.uid;

    try {
        if (!["organiser", "vendor"].includes(role)) {
            return res.status(400).json({ message: "Invalid role request" });
        }

        await db.query(
            "UPDATE users SET role=?, status='pending' WHERE user_id=?",
            [role, userId]
        );

        res.json({
            message: "Role upgrade request sent. Await admin approval"
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   APPROVE / REJECT ROLE (ADMIN)
======================= */
exports.updateUserRole = async (req, res) => {
    const { status } = req.body;
    const userId = req.params.id;

    try {
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        await db.query(
            "UPDATE users SET status=? WHERE user_id=?",
            [status, userId]
        );

        res.json({ message: `User role ${status}` });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
