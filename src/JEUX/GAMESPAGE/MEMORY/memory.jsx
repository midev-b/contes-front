import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import memory1 from "/GAMES/memory/memory1.jpg"; // à changer si tu veux une image propre au memory
import memory2 from "/GAMES/memory/memory2.jpg";
import trophy from "/GAMES/memory/trophy.png";

import "./memory.css"; // <-- nouveau CSS
import { AuthContext } from "../../../App";

export function MemoryPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="memory-container">
      <div className="middle-container">
        <Main />

        {/* Bloc trophée */}
        <div className="trophy">
          <div className="trophy-text">
            <h2>Memory Magique</h2>
            {isAuthenticated ? (
              <>
                <p>Amuse-toi et sauvegarde ta progression !</p>
                <p>
                  En réussissant tous les jeux de memory, tu décrocheras le{" "}
                  <strong>Memory d’or</strong> 🏆
                </p>
              </>
            ) : (
              <p>
                Connecte-toi pour débloquer le trophée{" "}
                <strong>"Mémoire d’or"</strong>
              </p>
            )}
          </div>
          <img
            src={trophy}
            alt="trophée"
            className={isAuthenticated ? "gold-trophy" : "gray-trophy"}
          />
        </div>

        {/* Les cartes */}
        <div className="memory-cards-container">
          {/* Carte Memory1 */}
          <Link to="/Jeux/Memoire/memoire1" className="card memory-card">
            <div className="game-img-container">
              <img src={memory1} alt="memory1" className="game-img" />
            </div>
            <div className="game-content">
              <h3>Mémoire 1</h3>
              <p className="game-text">Premier défi de mémoire 🧠</p>
              <button>Jouer</button>
            </div>
          </Link>

          {/* Carte Memory2 */}
          <Link to="/Jeux/Memoire/memoire2" className="card memory-card">
            <div className="game-img-container">
              <img src={memory2} alt="memory2" className="game-img" />
            </div>
            <div className="game-content">
              <h3>Mémoire2</h3>
              <p className="game-text">Deuxième défi encore plus rapide ⚡</p>
              <button>Jouer</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
