import React from "react";
import { Link } from "react-router-dom";
import { Main } from "../PublicComponents/main.jsx";
import "./games.css";
import riddles from "/GAMES/games/riddles.png";
import puzzles from "/GAMES/games/puzzles.png";
import memory from "/GAMES/games/memory.png";
import kite from "/GAMES/games/kite.png";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
export function GamesPage() {
  return (
    <div className="games-container">
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
      <div className="games-container-flex">
        <div className="middle-container">
          <Main />
          <div className="games-cards">
            <h1>Pattes & Plume</h1>
            <div className="games-text">
              <p>Choisis ton jeu préféré et amuse-toi!</p>
              <img src={kite} alt="cerf-volant" />
            </div>
            <div className="games-cards-container">
              <Link to="/Jeux/Enigmes" className="card riddles-card">
                <img src={riddles} alt="énigmes" />
                <h3>ÉNIGMES</h3>
              </Link>

              <Link to="/Jeux/Puzzles" className="card puzzles-card">
                <img src={puzzles} alt="puzzles" />
                <h3>PUZZLES</h3>
              </Link>

              <Link to="/Jeux/Memoire" className="card memory-card">
                <img src={memory} alt="mémoire" />
                <h3>MÉMOIRE</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
