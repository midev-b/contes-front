import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Main } from "../PublicComponents/main.jsx";

import "./login.css";
import bird from "/register/bird.png";
import grass1 from "/register/grass1.png";
import grass2 from "/register/grass2.png";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyer une requête POST pour se connecter
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important pour envoyer/recevoir les cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      setMessage("Connexion réussie !");
      // Après une courte pause, rediriger vers une page protégée, par exemple /dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login">
      <div className="middle-container">
        <Main className="main" />

        <img className="grass1" src={grass2} alt="herbe" />
        <img className="grass2" src={grass1} alt="herbe" />
        <div className="info-container">
          <img className="bird" src={bird} alt="oiseau" />

          <h2>Connexion</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Se connecter</button>
          </form>
          {message && <p className="message-connexion">{message}</p>}

          <p className="switch-register">
            Tu n’as pas encore de compte ?{" "}
            <Link to="/register" className="register-link">
              Inscris-toi ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
