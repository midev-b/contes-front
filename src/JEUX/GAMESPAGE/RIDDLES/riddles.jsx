import React from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";
// import "./games.css";

export function RiddlesPage() {
  return (
    <div className="riddles-container">
      <div className="middle-container">
        <Main />
        <div className="riddles-cards">
          <div className="riddles-cards-container">
            <Link to="/Jeux/Enigmes/Quiz" className="card quiz-card">
              <img src="https://placehold.co/600x400/EEE/31343C" alt="quiz" />
              <h3>QUIZ</h3>
            </Link>

            <Link to="/Jeux/Enigmes/Ombres" className="card ombres-card">
              <img src="https://placehold.co/600x400/EEE/31343C" alt="ombres" />
              <h3>JEU DES OMBRES</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
