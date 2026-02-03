import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function VendorDashboard() {
  return (
    <div className="vendor-dashboard">
      <h1>Vendor Dashboard 🛠️</h1>
      <p className="subtitle">
        Manage your profile, services and availability.
      </p>

      <div className="vendor-cards">
        <div className="vendor-card">
          <h3>Profile</h3>
          <p>Create and manage your vendor profile.</p>
          <Link to="/vendor/profile">Manage Profile</Link>
        </div>

        <div className="vendor-card">
          <h3>Services</h3>
          <p>Add and manage your service offerings.</p>
          <Link to="/vendor/services">Manage Services</Link>
        </div>

        <div className="vendor-card">
          <h3>Availability</h3>
          <p>Set your availability for bookings.</p>
          <Link to="/vendor/availability">Set Availability</Link>
        </div>
      </div>
    </div>
  );
}
