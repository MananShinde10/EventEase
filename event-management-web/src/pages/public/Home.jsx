import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>Event Management System</h1>
      <p>
        Discover events, manage bookings, and collaborate with vendors —
        all in one platform.
      </p>

      <div className="home-actions">
        <a href="/events" className="primary-btn">Browse Events</a>
        <a href="/signup" className="secondary-btn">Get Started</a>
      </div>
    </div>
  );
}
