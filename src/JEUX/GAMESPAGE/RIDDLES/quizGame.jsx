import React, { useEffect, useState, useContext } from "react";

import "./quizGame.css";
import fox2 from "/GAMES/riddles/quiz/fox2.png";
import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

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
      <div className="quiz-middle-container">
        <div className="title-img">
          <h3>QUIZ</h3>
          <img src={fox2} alt="renard" />
        </div>

        <div className={`message ${message === "" ? "" : "message--visible"}`}>
          <p>{message}</p>
        </div>
        {/* 
        {error && <div style={{ color: "red" }}>{error}</div>} */}

        {getQuizQuestions.length > 0 ? (
          <div className="questions-container">
            <h4>{getQuizQuestions[currentIndex].questionText}</h4>
            {getQuizQuestions[currentIndex].options.map((option, i) => (
              <div
                key={i}
                className={`option ${
                  selectedOptionIndex === i ? addClass : ""
                }`}
                onClick={() => handleAnswerClick(option.isCorrect, i)}
              >
                {option.text}
              </div>
            ))}
          </div>
        ) : (
          <div>Chargement des questions...</div>
        )}
      </div>
    </div>
  );
}
