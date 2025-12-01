import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Main } from "../PublicComponents/main.jsx";

import "./login.css";
import bird from "/register/bird.png";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

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
