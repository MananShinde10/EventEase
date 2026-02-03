import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ApproveEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  const approve = (id) => {
    api.put(`/events/approve/${id}`).then(() => {
      alert("Event approved");
    });
  };

  return (
    <div>
      <h2>Approve Events</h2>
      {events.map(e => (
        <div key={e.event_id}>
          {e.title}
          <button onClick={() => approve(e.event_id)}>Approve</button>
        </div>
      ))}
    </div>
  );
}
