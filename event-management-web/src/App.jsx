import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

// Navbar
import Navbar from "./components/Navbar";

// Public pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Signup from "./pages/public/Signup";
import Events from "./pages/public/Events";

// Attendee pages
import AttendeeDashboard from "./pages/attendee/Dashboard";
import MyBookings from "./pages/attendee/MyBookings";
import Notifications from "./pages/attendee/Notifications";

// Organiser pages
import CreateEvent from "./pages/organiser/CreateEvent";
import OrganiserDashboard from "./pages/organiser/Dashboard";

// Vendor pages
import VendorProfile from "./pages/vendor/VendorProfile";
import Services from "./pages/vendor/Services";
import Availability from "./pages/vendor/Availability";
import VendorDashboard from "./pages/vendor/Dashboard";


// Admin pages
import AdminEvents from "./pages/admin/Events";
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import ApproveEvents from "./pages/admin/ApproveEvents";
import Bookings from "./pages/admin/Bookings";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Navigation bar visible on all pages */}
        <Navbar />

        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />

          {/* ---------- Attendee Routes ---------- */}
          <Route
            path="/attendee"
            element={
              <ProtectedRoute role="attendee">
                <AttendeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendee/bookings"
            element={
              <ProtectedRoute role="attendee">
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendee/notifications"
            element={
              <ProtectedRoute role="attendee">
                <Notifications />
              </ProtectedRoute>
            }
          />

          {/* ---------- Organiser Routes ---------- */}
          <Route
          path="/organiser"
          element={
            <ProtectedRoute role="organiser">
              <OrganiserDashboard />
            </ProtectedRoute>
            }
          />
          <Route
            path="/organiser/create-event"
            element={
              <ProtectedRoute role="organiser">
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          {/* ---------- Vendor Routes ---------- */}
          <Route path="/vendor" element={<ProtectedRoute role="vendor"><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/profile" element={<ProtectedRoute role="vendor"><VendorProfile /></ProtectedRoute>} />
          <Route path="/vendor/services" element={<ProtectedRoute role="vendor"><Services /></ProtectedRoute>} />
          <Route path="/vendor/availability" element={<ProtectedRoute role="vendor"><Availability /></ProtectedRoute>} />

          {/* ---------- Admin Routes ---------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute role="admin">
                <AdminEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approve-events"
            element={
              <ProtectedRoute role="admin">
                <ApproveEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute role="admin">
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
