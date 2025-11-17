import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import memory1 from "/GAMES/memory/memory1.jpg";
import memory2 from "/GAMES/memory/memory2.jpg";
import trophy from "/GAMES/memory/trophy.png";

import "./memory.css";
import { AuthContext } from "../../../App";

export function MemoryPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="memory-container">
      <div className="middle-container">
        <Main />

        {/* Bloc trophée */}
        <div className="content-container">
          <div className="trophy">
            <h2>Mémoire Magique</h2>
            {isAuthenticated ? (
              <div className="trophy-name-img">
                <p>
                  En réussissant tous les jeux, tu décrocheras le{" "}
                  <strong>Memory d’or</strong>
                </p>
                <img src={trophy} alt="trophée" className="gold-trophy" />
              </div>
            ) : (
              <div className="trophy-name-img">
                <p>
                  Connecte-toi pour débloquer le trophée{" "}
                  <strong>"Mémoire d’or"</strong>
                </p>
                <img src={trophy} alt="trophée" className="gray-trophy" />
              </div>
            )}
          </div>

          {/* Cartes */}
          <div className="memory-cards-container">
            <Link to="/Jeux/Memoire/memoire1" className="card memory-card">
              <div className="game-img-container">
                <img src={memory1} alt="memory1" className="game-img" />
              </div>
              <div className="game-content">
                <h3>Jeu de cartes</h3>
                <p className="game-text">Premier défi de mémoire</p>
                <button>Jouer</button>
              </div>
            </Link>

            <Link to="/Jeux/Memoire/memoire2" className="card memory-card">
              <div className="game-img-container">
                <img src={memory2} alt="memory2" className="game-img" />
              </div>
              <div className="game-content">
                <h3>Jeu de bulles</h3>
                <p className="game-text">Deuxième défi encore plus rapide</p>
                <button>Jouer</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
