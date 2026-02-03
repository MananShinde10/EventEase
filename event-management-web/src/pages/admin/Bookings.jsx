import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/bookings").then(res => setBookings(res.data));
  }, []);

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.map(b => (
        <div key={b.booking_id}>
          {b.attendee_name} - {b.title} - ₹{b.total_amount}
        </div>
      ))}
    </div>
  );
}
