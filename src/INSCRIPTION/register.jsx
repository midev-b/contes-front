import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import bird from "/register/bird.png";
import grass1 from "/register/grass1.png";
import grass2 from "/register/grass2.png";

import { Main } from "../PublicComponents/main.jsx";
export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      setMessage(
        "✅ Inscription réussie ! Un email de vérification vous a été envoyé."
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="middle-container">
        <Main className="main" />

        <img className="grass1" src={grass2} alt="herbe" />
        <img className="grass2" src={grass1} alt="herbe" />
        <div className="info-container">
          <img className="bird" src={bird} alt="oiseau" />
          <h2>Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nom :</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Mot de passe :</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">S'inscrire</button>
          </form>

          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
