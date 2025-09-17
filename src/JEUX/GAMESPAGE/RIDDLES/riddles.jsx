import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import fox from "/GAMES/riddles/fox.png";
import penguin from "/GAMES/riddles/penguin.png";
import owlGray from "/GAMES/riddles/owl-gray.png";
import owlTrophy from "/GAMES/riddles/owl-trophy.png";

import "./riddles.css";
import { AuthContext } from "../../../App";

export function RiddlesPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="riddles-container">
      <div className="middle-container">
        <Main />

        <div className="trophy">
          <div className="trophy-text">
            <h2>Enigmes Magiques</h2>
            {isAuthenticated ? (
              <>
                <p>Amuse-toi et sauvegarde ta progression !</p>
                <p>
                  En réussissant tous les jeux, tu deviendras le{" "}
                  <strong>Maître des Énigmes </strong>
                </p>
              </>
            ) : (
              <p>
                Connecte-toi pour débloquer le trophée{" "}
                <strong>"Maître des Énigmes"</strong>
              </p>
            )}
          </div>
          <img
            src={isAuthenticated ? owlTrophy : owlGray}
            alt={isAuthenticated ? "hibou trophée" : "hibou gris"}
            className="owl-icon"
          />
        </div>

        <div className="riddles-cards-container">
          {/* Carte QUIZ */}
          <Link to="/Jeux/Enigmes/Quiz" className="card quiz-card">
            <div className="game-column">
              <img src={fox} alt="renard-quiz" className="game-img" />
              <h3>QUIZ</h3>
              <p className="game-text">Teste ton esprit rusé comme le renard</p>
              <button>Jouer</button>
            </div>
          </Link>

          {/* Carte OMBRES */}
          <Link to="/Jeux/Enigmes/Ombres" className="card ombres-card">
            <div className="game-column">
              <img src={penguin} alt="pingouin-ombre" className="game-img" />
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
  );
}
