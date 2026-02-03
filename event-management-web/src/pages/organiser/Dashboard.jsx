import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Dashboard.css";

export default function OrganiserDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => alert("Failed to load events"));
  }, []);

  return (
    <div className="organiser-dashboard">
      <h1>Organiser Dashboard 🎯</h1>
      <p className="subtitle">
        Create events and track their approval status.
      </p>

      <div className="organiser-actions">
        <Link to="/organiser/create-event" className="primary-btn">
          + Create New Event
        </Link>
      </div>

      <h2 className="section-title">My Events</h2>

      {events.length === 0 && (
        <p className="empty-text">No events created yet.</p>
      )}

      <div className="events-grid">
        {events.map(event => (
          <div key={event.event_id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>

            <span className={`status ${event.status}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
