import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import fox from "/GAMES/riddles/fox.jpg";
import penguin from "/GAMES/riddles/penguin.jpg";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import trophy from "/GAMES/riddles/trophy.png";
import { ProgressBar } from "../../../PublicComponents/progressBar";
import "./riddles.css";
import { AuthContext } from "../../../App";
export function RiddlesPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="riddles-container">
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
              <h2>Énigmes Mystérieuses</h2>

              {isAuthenticated ? (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Termine tous les jeux et remporte{" "}
                      <strong>Maître des Énigmes</strong>
                    </p>
                    <ProgressBar category="riddles" />
                  </div>
                  <img src={trophy} alt="trophée" className="gold-trophy" />
                </div>
              ) : (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Connecte-toi pour tenter de devenir le{" "}
                      <strong>Maître des Énigmes</strong>
                    </p>
                  </div>
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
                  <img
                    src={penguin}
                    alt="pingouin-ombre"
                    className="game-img"
                  />
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
    </div>
  );
}
