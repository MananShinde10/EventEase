const db = require("../db");

/**
 * GET /api/notifications
 */
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.uid; // ✅ FIXED

    const [rows] = await db.query(
      `SELECT notification_id, title, message, is_read, data, created_at
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

/**
 * PUT /api/notifications/:id/read
 */
exports.markAsRead = async (req, res) => {
  try {
    const userId = req.user.uid; // ✅ FIXED
    const notificationId = req.params.id;

    const [result] = await db.query(
      `UPDATE notifications
       SET is_read = 1
       WHERE notification_id = ? AND user_id = ?`,
      [notificationId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification" });
  }
};

/**
 * INTERNAL USE
 */
exports.createNotification = async (user_id, title, message, data = null) => {
  await db.query(
  `INSERT INTO notifications (user_id, title, message, data)
   VALUES (?, ?, ?, ?)`,
  [attendeeId, "Booking Confirmed", `Your booking for "${eventTitle}" has been confirmed.`, JSON.stringify({ event_id })]
    );
};

