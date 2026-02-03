import { useState, useContext } from "react";
import api from "../../api/axios";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    login(res.data.token);

    const role = JSON.parse(atob(res.data.token.split(".")[1])).role;

    if (role === "admin") navigate("/admin");
    else if (role === "vendor") navigate("/vendor/profile");
    else if (role === "organiser") navigate("/organiser/create-event");
    else navigate("/attendee");
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
