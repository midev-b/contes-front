import React from "react";
import { Link } from "react-router-dom";
import { Main } from "../../../PublicComponents/main";
// import "./games.css";
import quiz from "/riddles/quiz.jpg";
import ombres from "/riddles/shadow.jpg";

export function RiddlesPage() {
  return (
    <div className="games-container">
      <div className="middle-container">
        <Main />
        <div className="games-cards">
          <div className="games-cards-container">
            <Link to="/Jeux/Enigmes/Quiz" className="card quiz-card">
              <img src={quiz} alt="quiz" />
              <h3>QUIZ</h3>
            </Link>

            <Link to="/Jeux/Enigmes/Ombres" className="card ombres-card">
              <img src={ombres} alt="ombres" />
              <h3>JEU DES OMBRES</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
