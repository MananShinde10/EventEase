import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Services.css";

export default function Services() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    service_name: "",
    title: "",
    description: "",
    base_price: "",
  });

  const fetchServices = () => {
    api.get("/vendors/services")
      .then(res => setServices(res.data))
      .catch(() => alert("Failed to load services"));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addService = async (e) => {
    e.preventDefault();

    try {
      await api.post("/vendors/services", {
        ...form,
        base_price: Number(form.base_price),
      });
      alert("Service added successfully");
      setForm({
        service_name: "",
        title: "",
        description: "",
        base_price: "",
      });
      fetchServices();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add service");
    }
  };

  return (
    <div className="vendor-services-page">
      <h2>My Services</h2>

      {/* ADD SERVICE FORM */}
      <form className="service-form" onSubmit={addService}>
        <h3>Add New Service</h3>

        <input
          name="service_name"
          placeholder="Service Name (e.g. Photography)"
          value={form.service_name}
          onChange={handleChange}
          required
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="base_price"
          placeholder="Base Price"
          value={form.base_price}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Service</button>
      </form>

      {/* SERVICES LIST */}
      <div className="services-grid">
        {services.map(service => (
          <div className="service-card" key={service.vendor_service_id}>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
            <span>₹{service.base_price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
