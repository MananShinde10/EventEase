import { useState } from "react";
import api from "../../api/axios";
import "./CreateEvent.css";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start_datetime: "",
    end_datetime: "",
    capacity: "",
    base_price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/events", {
        ...form,
        capacity: Number(form.capacity),
        base_price: Number(form.base_price),
      });

      alert("Event created successfully. Await admin approval.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <div className="create-event-page">
      <h2>Create New Event</h2>

      <form className="event-form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Event Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Event Description"
          onChange={handleChange}
          required
        />

        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          name="start_datetime"
          onChange={handleChange}
          required
        />

        <label>End Date & Time</label>
        <input
          type="datetime-local"
          name="end_datetime"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          onChange={handleChange}
        />

        <input
          type="number"
          name="base_price"
          placeholder="Base Price"
          onChange={handleChange}
          required
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
