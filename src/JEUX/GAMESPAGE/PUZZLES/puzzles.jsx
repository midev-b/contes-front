import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";

import puzzle1 from "/GAMES/puzzles/puzzle1.jpg";
import puzzle2 from "/GAMES/puzzles/puzzle2.jpg";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import trophy from "/GAMES/puzzles/trophy.png";

import { ProgressBar } from "../../../PublicComponents/progressBar";
import "./puzzles.css";
import { AuthContext } from "../../../App";

export function PuzzlesPage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="puzzles-container riddles-container">
      <div className="global-container">
        {/* Herbes décoratives */}
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
              <h2>Puzzles Magiques</h2>

              {isAuthenticated ? (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Termine tous les puzzles et remporte le{" "}
                      <strong>Puzzle d’or</strong>
                    </p>
                    <ProgressBar category="puzzles" />
                  </div>
                  <img src={trophy} alt="trophée" className="gold-trophy" />
                </div>
              ) : (
                <div className="trophy-name-img row">
                  <div className="trophy-text">
                    <p>
                      Connecte-toi pour tenter de décrocher le{" "}
                      <strong>Puzzle d’or</strong>
                    </p>
                  </div>
                  <img src={trophy} alt="trophée" className="gray-trophy" />
                </div>
              )}
            </div>

            {/* Cartes */}
            <div className="puzzles-cards-container riddles-cards-container">
              <Link to="/Jeux/Puzzles/Puzzle1" className="card puzzle-card">
                <div className="game-img-container">
                  <img src={puzzle1} alt="puzzle1" className="game-img" />
                </div>
                <div className="game-content">
                  <h3>Puzzle 1</h3>
                  <p className="game-text">Premier défi de logique</p>
                  <button>Jouer</button>
                </div>
              </Link>

              <Link to="/Jeux/Puzzles/Puzzle2" className="card puzzle-card">
                <div className="game-img-container">
                  <img src={puzzle2} alt="puzzle2" className="game-img" />
                </div>
                <div className="game-content">
                  <h3>Puzzle 2</h3>
                  <p className="game-text">Deuxième défi encore plus malin</p>
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
