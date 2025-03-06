import React from "react";
import "./main.css";
import { Link } from "react-router-dom";
export function Main() {
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
        <a>
          <Link to="/register">S'inscrire</Link>
        </a>
        <p> ou </p>
        <a>
          <Link to="/login"> Se connecter </Link>
        </a>
      </div>
    </nav>
  );
}
