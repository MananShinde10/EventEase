import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Availability.css";

export default function Availability() {
  const [availability, setAvailability] = useState([]);
  const [form, setForm] = useState({
    vendor_service_id: "",
    available_from: "",
    available_to: ""
  });

  const fetchAvailability = async () => {
    const res = await api.get("/vendors/availability");
    setAvailability(res.data);
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/vendors/availability", form);
    alert("Availability added");
    fetchAvailability();
  };

  return (
    <div className="availability-page">
      <h2>Availability</h2>

      <form className="availability-form" onSubmit={handleSubmit}>
        <input name="vendor_service_id" placeholder="Service ID" onChange={handleChange} required />
        <input type="datetime-local" name="available_from" onChange={handleChange} required />
        <input type="datetime-local" name="available_to" onChange={handleChange} required />
        <button>Add Availability</button>
      </form>

      <ul className="availability-list">
        {availability.map(a => (
          <li key={a.availability_id}>
            {a.available_from} → {a.available_to}
          </li>
        ))}
      </ul>
    </div>
  );
}
