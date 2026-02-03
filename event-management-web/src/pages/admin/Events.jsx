import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Events.css";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events/admin");
      setEvents(res.data);
    } catch {
      alert("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const approveEvent = async (id) => {
    try {
      await api.put(`/events/approve/${id}`);
      alert("Event approved");
      fetchEvents();
    } catch {
      alert("Approval failed");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/events/${id}`);
      alert("Event deleted");
      fetchEvents();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="admin-events-page">
      <h2>Event Management</h2>

      <table className="events-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Organizer</th>
            <th>Status</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.map(event => (
            <tr key={event.event_id}>
              <td>{event.title}</td>
              <td>{event.organizer_id}</td>
              <td>
                <span className={`status ${event.status}`}>
                  {event.status}
                </span>
              </td>
              <td>{event.published ? "Yes" : "No"}</td>
              <td>
                {event.status !== "published" && (
                  <button
                    className="approve-btn"
                    onClick={() => approveEvent(event.event_id)}
                  >
                    Approve
                  </button>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteEvent(event.event_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
