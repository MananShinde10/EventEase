import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings/my").then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map(b => (
        <div key={b.booking_id}>
          {b.title} - {b.start_datetime}
        </div>
      ))}
    </div>
  );
}
