import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Profile.css";

export default function VendorProfile() {
  const [form, setForm] = useState({
    company_name: "",
    about: "",
    city: "",
    state: "",
    country: ""
  });

  const fetchProfile = async () => {
    const res = await api.get("/vendors/profile");
    if (res.data) setForm(res.data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post("/vendors/profile", form);
    alert("Vendor profile saved");
  };

  return (
    <div className="vendor-profile">
      <h2>Vendor Profile</h2>

      <form onSubmit={handleSubmit} className="profile-form">
        <input name="company_name" placeholder="Company Name" value={form.company_name || ""} onChange={handleChange} required />
        <textarea name="about" placeholder="About" value={form.about || ""} onChange={handleChange} />
        <input name="city" placeholder="City" value={form.city || ""} onChange={handleChange} />
        <input name="state" placeholder="State" value={form.state || ""} onChange={handleChange} />
        <input name="country" placeholder="Country" value={form.country || ""} onChange={handleChange} />
        <button>Save Profile</button>
      </form>
    </div>
  );
}
