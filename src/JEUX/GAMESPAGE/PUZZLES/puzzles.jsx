import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import puzzle1 from "/GAMES/puzzles/puzzle1.jpg";
import puzzle2 from "/GAMES/puzzles/puzzle2.jpg";
import trophy from "/GAMES/puzzles/trophy.png";

import "./puzzles.css";
import { AuthContext } from "../../../App";

export function PuzzlesPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="puzzles-container">
      <div className="middle-container">
        <Main />

        {/* Bloc trophée */}
        <div className="content-container">
          <div className="trophy">
            <h2>Puzzles Magiques</h2>
            <p>Amuse-toi et sauvegarde ta progression !</p>

            {isAuthenticated ? (
              <div className="trophy-name-img">
                <p>
                  En réussissant tous les puzzles, tu décrocheras le{" "}
                  <strong>Puzzle d’or</strong>
                </p>
                <img src={trophy} alt="trophée" className="gold-trophy" />
              </div>
            ) : (
              <div className="trophy-name-img">
                <p>
                  Connecte-toi pour débloquer le trophée{" "}
                  <strong>"Puzzle d’or"</strong>
                </p>
                <img src={trophy} alt="trophée" className="gray-trophy" />
              </div>
            )}
          </div>

          {/* Les cartes */}
          <div className="puzzles-cards-container">
            <Link to="/Jeux/Puzzles/Puzzle1" className="card puzzle-card">
              <div className="game-img-container">
                <img src={puzzle1} alt="puzzle1" className="game-img" />
              </div>
              <div className="game-content">
                <h3>Puzzle 1</h3>
                <p className="game-text">Premier défi de logique 🧩</p>
                <button>Jouer</button>
              </div>
            </Link>

            <Link to="/Jeux/Puzzles/Puzzle2" className="card puzzle-card">
              <div className="game-img-container">
                <img src={puzzle2} alt="puzzle2" className="game-img" />
              </div>
              <div className="game-content">
                <h3>Puzzle 2</h3>
                <p className="game-text">Deuxième défi encore plus malin 🧠</p>
                <button>Jouer</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
