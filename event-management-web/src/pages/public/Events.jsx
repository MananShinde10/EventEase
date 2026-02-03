import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../auth/AuthContext";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  const bookEvent = async (eventId) => {
    if (!auth.token) {
      alert("Please login to book events");
      return;
    }

    try {
      await api.post("/bookings", { event_id: eventId });
      alert("Booking confirmed!");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="events-page">
      <h2>Available Events</h2>

      <div className="events-grid">
        {events.map(event => (
          <div className="event-card" key={event.event_id}>
            <h3>{event.title}</h3>
            <p>{event.description || "No description available"}</p>
            <span>₹{event.base_price}</span>

            {auth.token && (
              <button
                className="book-btn"
                onClick={() => bookEvent(event.event_id)}
              >
                Book Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
