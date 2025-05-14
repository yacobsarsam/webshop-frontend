import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/authStore.ts";
import { Button } from "@chakra-ui/react";
import PageButton from "@/components/PageButton.tsx";

const AddUserPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role is "USER"
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("All fields are required.");
      return;
    }

    const token = useAuthStore.getState().token;

    try {
      await axios.post(
        "http://localhost:8080/auth/register", // Replace with your API endpoint
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      alert("User created successfully!");
      navigate("/admin/users/"); // Redirect to admin page after success
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            `Error ${err.response?.status}: ${err.response?.statusText || "Forbidden"}`,
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "1rem" }}>
      <h2>Create New User</h2>
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
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="role"
            style={{ display: "block", marginBottom: "0.5rem" }}
          >
            Role:
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value.toUpperCase())}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          type="submit"
          style={{ padding: "0.5rem 1rem" }}
          colorPalette="blue"
        >
          Create User
        </Button>
        <PageButton btnName={"Cancel"} navigateTo={"/admin/users/"} />
      </form>
    </div>
  );
};

export default AddUserPage;
