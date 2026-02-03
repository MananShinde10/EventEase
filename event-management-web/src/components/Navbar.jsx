import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
      </div>

      <div className="navbar-right">
        {!auth.token && (
          <>
            <Link to="/login">Login</Link>
            <Link className="signup-btn" to="/signup">Signup</Link>
          </>
        )}

        {auth.token && auth.user?.role === "attendee" && (
          <>
            <Link to="/attendee">Dashboard</Link>
            <Link to="/attendee/bookings">My Bookings</Link>
            <Link to="/attendee/notifications">Notifications</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {auth.token && auth.user?.role === "vendor" && (
        <>
            <Link to="/vendor">Dashboard</Link>
            <Link to="/vendor/profile">Profile</Link>
            <Link to="/vendor/services">Services</Link>
            <Link to="/vendor/availability">Availability</Link>
            <button onClick={handleLogout}>Logout</button>
            </>
        )}

        {auth.token && auth.user?.role === "admin" && (
        <>
            <Link to="/admin">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/events">Events</Link>
            <button onClick={handleLogout}>Logout</button>
        </>
        )}


        {auth.token && auth.user?.role === "organiser" && (
        <>
            <Link to="/organiser">Dashboard</Link>
            <Link to="/organiser/create-event">Create Event</Link>
            <button onClick={handleLogout}>Logout</button>
        </>
        )}

      </div>
    </nav>
  );
}
