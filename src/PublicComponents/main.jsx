import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";

export function Main() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/users/profile",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            console.log(data);
            setIsAuthenticated(true);
            setUserName(data.name);
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
  const getInitialsLetters = () => {
    return userName.slice(0, 2).toUpperCase();
  };
  return (
    <nav className="main">
      <div className="nav-item">
        <Link to="/">Accueil</Link>
      </div>
      <div className="nav-item">
        <Link to="/Histoires">Histoires</Link>
      </div>
      <div className="nav-item">
        <Link to="/Jeux">Jeux</Link>
      </div>
      <div className="connexion">
        {isAuthenticated ? (
          <>
            <div className="nav-item" onClick={handleLogout}>
              <a>Se déconnecter</a>
            </div>
            <div className="nav-item user-name">
              <Link to="/dashboard" className="welcome-message">
                {getInitialsLetters()}
              </Link>
            </div>
          </>
        ) : (
          <div className="login-register">
            <div className="nav-item">
              <Link to="/register">S'inscrire</Link>
            </div>
            <p> ou </p>
            <div className="nav-item">
              <Link to="/login">Se connecter</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
