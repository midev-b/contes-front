import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import fox from "/GAMES/riddles/fox.jpg";
import penguin from "/GAMES/riddles/penguin.jpg";
import trophy from "/GAMES/riddles/trophy.png";
import { ProgressBar } from "../../../PublicComponents/progressBar";
import "./riddles.css";
import { AuthContext } from "../../../App";

export function RiddlesPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="riddles-container">
      <div className="middle-container">
        <Main />

        {/* Bloc trophée */}
        <div className="content-container">
          <div className="trophy">
            <h2>Énigmes Magiques</h2>
            <p>Amuse-toi et sauvegarde ta progression !</p>

            {isAuthenticated ? (
              <div className="trophy-name-img">
                <p>
                  En réussissant tous les jeux, tu deviendras le{" "}
                  <strong>Maître des Énigmes</strong>
                </p>
                <ProgressBar />
                <img src={trophy} alt="trophée" className="gold-trophy" />
              </div>
            ) : (
              <div className="trophy-name-img">
                <p>
                  Connecte-toi pour débloquer le trophée{" "}
                  <strong>"Maître des Énigmes"</strong>
                </p>
                <img src={trophy} alt="trophée" className="gray-trophy" />
              </div>
            )}
          </div>

          {/* Cartes */}
          <div className="riddles-cards-container">
            <Link to="/Jeux/Enigmes/Quiz" className="card riddle-card">
              <div className="game-img-container">
                <img src={fox} alt="renard-quiz" className="game-img" />
              </div>
              <div className="game-content">
                <h3>QUIZ</h3>
                <p className="game-text">
                  Teste ton esprit rusé comme le renard
                </p>
                <button>Jouer</button>
              </div>
            </Link>

            <Link to="/Jeux/Enigmes/Ombres" className="card riddle-card">
              <div className="game-img-container">
                <img src={penguin} alt="pingouin-ombre" className="game-img" />
              </div>
              <div className="game-content">
                <h3>JEU DES OMBRES</h3>
                <p className="game-text">
                  Découvre les ombres malicieuses du pingouin
                </p>
                <button>Jouer</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
