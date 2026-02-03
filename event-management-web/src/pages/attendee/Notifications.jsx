import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    api.get("/notifications")
      .then(res => setNotifications(res.data))
      .catch(() => alert("Failed to load notifications"));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      fetchNotifications(); // refresh list
    } catch {
      alert("Failed to mark as read");
    }
  };

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>

      {notifications.length === 0 && (
        <p className="empty-text">No notifications available.</p>
      )}

      {notifications.map(n => (
        <div
          key={n.notification_id}
          className={`notification-card ${n.is_read ? "read" : "unread"}`}
        >
          <div className="notification-header">
            <h4>{n.title}</h4>
            {!n.is_read && (
              <button onClick={() => markAsRead(n.notification_id)}>
                Mark as read
              </button>
            )}
          </div>

          <p>{n.message}</p>

          <span className="timestamp">
            {new Date(n.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
