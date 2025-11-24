import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";

import "./quizGame.css";
import fox2 from "/GAMES/riddles/quiz/fox2.png";
import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

import grassFox2 from "/GAMES/riddles/quiz/grassFox2.png";

export function QuizPage() {
  const { isAuthenticated } = useContext(AuthContext);

  const [getQuizQuestions, setGetQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [addClass, setAddClass] = useState("");
  const [error, setError] = useState("");

  // Récupération des questions
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/quiz");
        if (!response.ok)
          throw new Error("Problème de chargement des questions");
        const data = await response.json();
        setGetQuizQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchQuizQuestions();
  }, []);

  // Gestion du clic sur une réponse
  const handleAnswerClick = (isCorrect, i) => {
    if (isDisabled) return;

    setIsDisabled(true);
    setSelectedOptionIndex(i);

    if (isCorrect) {
      setAddClass("correctAnswer");
      setMessage("Bravo! Bonne réponse!");

      setTimeout(() => {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= getQuizQuestions.length) {
          setMessage("Félicitations! Quiz terminé!");
          sendGameCompletion("Enigme", "quiz", isAuthenticated);
        } else {
          setCurrentIndex(nextIndex);
          setMessage("");
          setSelectedOptionIndex(null);
          setAddClass("");
          setIsDisabled(false);
        }
      }, 1500);
    } else {
      setAddClass("incorrectAnswer");
      setMessage("Réponse incorrecte, réessaye encore.");

      setTimeout(() => {
        setMessage("");
        setSelectedOptionIndex(null);
        setAddClass("");
        setIsDisabled(false);
      }, 1500);
    }
  };
  return (
    <div className="quiz-global-container">
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

      <div className="quiz-middle-container">
        <div className="quiz-content">
          <p className="quiz-question-game">Clique sur la bonne réponse</p>
          <div className="quiz-header">
            <Link to="/Jeux/Enigmes">
              <img
                className=" quiz-back"
                src="/GAMES/games/back-to-games.png"
              />
            </Link>
            <div
              className={`quiz-message ${
                message === "" ? "" : "quiz-message--visible"
              }`}
            >
              {message}
            </div>
            <div className=" quiz-fox-grass">
              <img src={fox2} alt="renard" className="quiz-fox" />
              <img src={grassFox2} alt="herbes" className="grass-fox2" />
            </div>
          </div>
          <div className="quiz-questions-container">
            {error && <p className="quiz-error">{error}</p>}

            {getQuizQuestions.length > 0 ? (
              <div className="quiz-box">
                <h4 className="quiz-question">
                  {getQuizQuestions[currentIndex].questionText}
                </h4>

                {getQuizQuestions[currentIndex].options.map((option, i) => (
                  <button
                    key={i}
                    className={`quiz-option ${
                      selectedOptionIndex === i ? addClass : ""
                    }`}
                    onClick={() => handleAnswerClick(option.isCorrect, i)}
                    disabled={isDisabled}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            ) : (
              <div className="quiz-loading">Chargement des questions...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
