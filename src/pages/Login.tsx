import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "@/authStore"; // Import your Zustand store

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // To handle redirectTo query parameter

  const login = useAuthStore((state) => state.login); // Get the login action from Zustand
  const manualLogout = useAuthStore().manualLogout; // Get the login action from Zustand

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const { token, role } = response.data;

      // Store token and role in Zustand
      login(token, email, role); // Store token in Zustand

      alert("Login successful!");
      // Check if there's a `redirectTo` query parameter
      const redirectTo = new URLSearchParams(location.search).get("redirectTo");

      // Redirect the user either to the `redirectTo` path or a default page (like /admin)
      if (redirectTo && !manualLogout) {
        navigate(redirectTo); // Redirect to the page they were trying to visit
      } else {
        navigate("/admin"); // Redirect to admin page or another default page
      }
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };
  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
