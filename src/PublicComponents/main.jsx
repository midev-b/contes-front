import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";

export function Main() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifier l'authentification en appelant la route /profile
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/users/profile",
          {
            method: "GET",
            credentials: "include", // Important pour envoyer le cookie httpOnly
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification d'authentification :",
          error
        );
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de déconnexion (qui appelle la route /logout côté back-end)
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsAuthenticated(false);
        navigate("/login");
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  return (
    <nav className="main">
      <a>
        <Link to="/">Accueil</Link>
      </a>
      <a>
        <Link to="/Histoires">Histoires</Link>
      </a>
      <a>
        <Link to="/Jeux">Jeux</Link>
      </a>
      <div className="connexion">
        {isAuthenticated ? (
          // Si l'utilisateur est connecté, afficher le bouton de déconnexion
          <a onClick={handleLogout}>Se déconnecter</a>
        ) : (
          // Sinon, afficher les liens pour S'inscrire et Se connecter
          <>
            <a>
              <Link to="/register">S'inscrire</Link>
            </a>
            <p> ou </p>
            <a>
              <Link to="/login">Se connecter</Link>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
