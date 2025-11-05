import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main.css";
import { AuthContext } from "../App";

// Images
import home from "/main/home.png";
import stories from "/main/stories.png";
import games from "/main/games.png";
import connexion from "/main/connexion.png";
import exit from "/main/exit.png";
import profile from "/main/profile.png";

export function Main() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
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
            setIsAuthenticated(true);
            setUserName(data.name);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erreur d'authentification :", error);
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
      }
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    }
  };

  const getInitialsLetters = () => {
    return userName.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="main-nav">
      <Link className="menu-btn" to="/">
        <img src={home} alt="Accueil" />
        <span>Accueil</span>
      </Link>
      <Link className="menu-btn" to="/Histoires">
        <img src={stories} alt="Histoires" />
        <span>Histoires</span>
      </Link>
      <Link className="menu-btn" to="/Jeux">
        <img src={games} alt="Jeux" />
        <span>Jeux</span>
      </Link>

      {isAuthenticated ? (
        <>
          <Link className="menu-btn" onClick={handleLogout}>
            <img src={exit} alt="Déconnexion" />
            <span>Déconnexion</span>
          </Link>
          <Link to="/dashboard" className="menu-btn profile-btn">
            <img src={profile} alt="Profil" />
            <span>{getInitialsLetters()}</span>
          </Link>
        </>
      ) : (
        <>
          <Link className="menu-btn" to="/register">
            <img src={connexion} alt="Inscription" />
            <span>Inscription</span>
          </Link>
          <Link className="menu-btn" to="/login">
            <img src={connexion} alt="Connexion" />
            <span>Connexion</span>
          </Link>
        </>
      )}
    </nav>
  );
}
