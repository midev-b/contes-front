import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Permet d'envoyer et de recevoir les cookies
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log(data);
      console.log(response);

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      setMessage("Inscription réussie ! Redirection en cours...");

      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
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
      {message && <p>{message}</p>}
    </div>
  );
}
