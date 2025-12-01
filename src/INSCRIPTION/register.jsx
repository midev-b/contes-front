import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import bird from "/register/bird.png";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

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
      <img src={grass1} alt="herbe gauche" className="grass grass-left" />
      <img src={grass2} alt="herbe droite" className="grass grass-right" />
      <img
        src={grass3}
        alt="herbe bas gauche"
        className="grass grass-bottom-left"
      />
      <img
        src={grass4}
        alt="herbe bas droite"
        className="grass grass-bottom-right"
      />
      <div className="middle-container">
        <Main className="main" />
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

          {message && <p className="register-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <p className="switch-login">
            Tu as déjà un compte ?{" "}
            <Link to="/login" className="login-link">
              Connecte-toi ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
