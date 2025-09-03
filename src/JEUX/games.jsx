import React from "react";
import { Link } from "react-router-dom";
import { Main } from "../PublicComponents/main.jsx";
import "./games.css";
import riddles from "/GAMES/games/riddles.png";
import puzzles from "/GAMES/games/puzzles.png";
import memory from "/GAMES/games/memory.png";
import kite from "/GAMES/games/kite.png";

export function GamesPage() {
  return (
    <div className="games-container">
      <div className="middle-container">
        <Main />
        <div className="games-cards">
          <div className="games-text">
            <p>Choisis ton jeu préféré et amuse-toi!</p>
            <img src={kite} alt="cerf-volant" />
          </div>
          <div className="games-cards-container">
            <Link to="/Jeux/Enigmes" className="card riddles-card">
              <img src={riddles} alt="énigmes" />
              <h3>ENIGMES</h3>
            </Link>

            <Link to="/Jeux/Puzzles" className="card puzzles-card">
              <img src={puzzles} alt="puzzles" />
              <h3>PUZZLES</h3>
            </Link>

            <Link to="/Jeux/Memoire" className="card memory-card">
              <img src={memory} alt="mémoire" />
              <h3>MEMOIRE</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
