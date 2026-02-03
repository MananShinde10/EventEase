import { Link } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [roleRequested, setRoleRequested] = useState("");

  const requestRoleUpgrade = async () => {
    if (!roleRequested) {
      alert("Please select a role");
      return;
    }

    try {
      await api.put("/users/request-role", {
        role: roleRequested,
      });
      alert("Role upgrade request sent to admin for approval");
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, Attendee 👋</h1>
      <p className="dashboard-subtitle">
        Manage your events, bookings, and account from here.
      </p>

      {/* MAIN DASHBOARD CARDS */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Browse Events</h3>
          <p>Explore available events and book your spot.</p>
          <Link to="/events" className="dashboard-btn">
            View Events
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>My Bookings</h3>
          <p>View all events you have booked.</p>
          <Link to="/attendee/bookings" className="dashboard-btn">
            My Bookings
          </Link>
        </div>

        <div className="dashboard-card">
          <h3>Notifications</h3>
          <p>Check updates and booking confirmations.</p>
          <Link to="/attendee/notifications" className="dashboard-btn">
            Notifications
          </Link>
        </div>
      </div>

      {/* ROLE UPGRADE SECTION */}
      <div className="role-upgrade-section">
        <h2>Request Role Upgrade</h2>
        <p>
          Want to become an organiser or vendor?  
          Submit a request for admin approval.
        </p>

        <div className="role-upgrade-actions">
          <select
            value={roleRequested}
            onChange={(e) => setRoleRequested(e.target.value)}
          >
            <option value="">Select role</option>
            <option value="organiser">Organiser</option>
            <option value="vendor">Vendor</option>
          </select>

          <button onClick={requestRoleUpgrade}>
            Request Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
