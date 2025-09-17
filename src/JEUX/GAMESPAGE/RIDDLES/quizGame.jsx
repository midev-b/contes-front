import React, { useEffect, useState } from "react";
import "./quizGame.css";
import fox2 from "/GAMES/riddles/fox2.png";
export function QuizPage() {
  const [getQuizQuestions, setGetQuizQuestions] = useState([]);
  const [error, setError] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [addClass, setAddClass] = useState("");

  useEffect(() => {
    const fetchQuizQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/quiz`);
        if (!response.ok) throw new Error("Problème de chargement...");
        const data = await response.json();
        setGetQuizQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchQuizQuestions();
  }, []);

  const handleAnswerClick = (isCorrect, i) => {
    if (isDisabled) return;

    setIsDisabled(true);
    setSelectedOptionIndex(i);

    if (isCorrect) {
      setAddClass("correctAnswer");
      setMessage("Bravo! bonne réponse!");

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setMessage("");
        setIsDisabled(false);
        setSelectedOptionIndex(null);
        setAddClass("");
      }, 1500);
    } else {
      setAddClass("incorrectAnswer");
      setMessage("Réponse incorrecte, réessaye encore.");

      setTimeout(() => {
        setMessage("");
        setIsDisabled(false);
        setSelectedOptionIndex(null);
        setAddClass("");
      }, 1500);
    }
  };

  return (
    <div className="quiz-global-container">
      <div className="quiz-middle-container">
        <h3>QUIZ</h3>
        <img src={fox2} alt="renard" />

        {message && <div className="message">{message}</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}

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
          <div>Chargement...</div>
        )}
      </div>
    </div>
  );
}
