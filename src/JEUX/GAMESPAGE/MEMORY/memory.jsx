import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import memory1 from "/GAMES/memory/memory1.jpg";
import memory2 from "/GAMES/memory/memory2.jpg";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import trophy from "/GAMES/memory/trophy.png";

import { ProgressBar } from "../../../PublicComponents/progressBar";
import "./memory.css";
import { AuthContext } from "../../../App";

export function MemoryPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="memory-container">
      <div className="global-container">
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
          <Main />

          {/* Bloc trophée */}
          <div className="content-container">
            <div className="trophy">
              <h2>Mémoire Magique</h2>

              {isAuthenticated ? (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Termine tous les jeux et remporte{" "}
                      <strong>Mémoire d’or</strong>
                    </p>
                    <ProgressBar category="Memoire" />
                  </div>
                  <img src={trophy} alt="trophée" className="gold-trophy" />
                </div>
              ) : (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Connecte-toi pour débloquer le trophée{" "}
                      <strong>“Mémoire d’or”</strong>
                    </p>
                  </div>
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
    </div>
  );
}
