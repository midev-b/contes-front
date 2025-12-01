import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import "./memory2.css";

import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

import { FinishedGame } from "../../../PublicComponents/finishedGame.jsx";
import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import back from "/GAMES/memory/memory2/back.png";
export function Memory2Page() {
  const { isAuthenticated } = useContext(AuthContext);
  const [memoBubbles, setMemoBubbles] = useState([]);
  const [displayBubbles, setDisplayBubbles] = useState([]);
  const [displayBubblesNew, setDisplayBubblesNew] = useState([]);

  const [questionsBubbles, setQuestionsBubbles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [bubbleClass, setBubbleClass] = useState({});
  useEffect(() => {
    if (memoBubbles.length === 0) return;
    setDisplayBubbles(memoBubbles[currentIndex].cards);
    setDisplayBubblesNew(memoBubbles[currentIndex].cards);

    const timer = setTimeout(() => {
      setDisplayBubbles([]);
      setQuestionsBubbles(memoBubbles[currentIndex].questionsCards);
    }, memoBubbles[currentIndex].time);

    return () => clearTimeout(timer);
  }, [currentIndex, memoBubbles]);

  const handleBubbles = (bubbleId) => {
    const present = displayBubblesNew.find((el) => el.id === bubbleId);
    console.log(present);
    console.log(displayBubbles, "bubbles");
    console.log(displayBubblesNew, "neew");
    setBubbleClass((prev) => ({
      ...prev,
      [bubbleId]: present ? "correct" : "incorrect",
    }));
    if (present && !answers.includes(present)) {
      setAnswers((prev) => {
        const newAnswers = [...prev, present];
        console.log(newAnswers, "aa");
        if (newAnswers.length === displayBubblesNew.length) {
          setTimeout(() => {
            if (currentIndex === memoBubbles.length - 1) {
              sendGameCompletion(
                "memory",
                "jeu de bulles",
                isAuthenticated,
                "Mémoire d'or"
              );
              setFinished(true);
              setDisplayBubblesNew([]);
              setDisplayBubbles([]);
              setAnswers([]);
              return; // STOP ici, on n’incrémente pas currentIndex
            }

            // Sinon on passe au niveau suivant
            setCurrentIndex(currentIndex + 1);
            setBubbleClass({});
            setDisplayBubblesNew([]);
            setDisplayBubbles([]);
            setAnswers([]);
          }, 1000);
        }
        return newAnswers;
      });
    }
  };

  useEffect(() => {
    const fetchMemoryBubbles = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/memory2");
        const data = await response.json();
        console.log("data", data);
        setMemoBubbles(data);
      } catch (err) {
        console.error("erreur fetch :", err);
      }
    };

    fetchMemoryBubbles();
  }, []);

  return (
    <div className="memory2-container">
      {finished ? (
        <Link to="/Jeux/Memoire">
          <FinishedGame />{" "}
        </Link>
      ) : (
        ""
      )}
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
        <Link to="/Jeux/Memoire">
          <img src={back} className="back" alt="retour" />
        </Link>
        <div className="game-container">
          {/* Bulles décoratives flottantes */}
          <div className="background-bubbles-container">
            <div className="background-bubbles">
              {Array.from({ length: 20 }).map((_, i) => (
                <img
                  key={i}
                  src="/GAMES/memory/memory2/bubble.png"
                  className={`decor-bubble size-${i % 5}`}
                  alt="bulle décorative"
                  style={{
                    animationDuration: `${5 + Math.random() * 10}s`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bulles à mémoriser */}
          <div className="display-bubbles-container">
            <div className="display-bubbles-flex">
              {displayBubbles.length > 0 &&
                displayBubbles.map((bubble, index) => {
                  const delay = (Math.random() * 2) / 2;
                  const duration = memoBubbles[currentIndex].time / 1000;

                  return (
                    <div
                      key={index}
                      className={`bubble bubble-anim size-${index % 3}`}
                      style={{
                        animationDuration: `${duration - index / 2}s`,
                        animationDelay: `${delay}s`,
                      }}
                    >
                      <img src={bubble.src} />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Bulles de questions ou message fin */}
          {displayBubbles.length === 0 && !finished && (
            <div className="questions-bubbles-container">
              <div className="questions-bubbles">
                <p>Clique sur les animaux que tu as vus</p>
                {questionsBubbles.map((bubble, index) => (
                  <div
                    key={index}
                    className="question-bubble"
                    onClick={() => handleBubbles(bubble.id)}
                  >
                    <img
                      className={bubbleClass[bubble.id] || ""}
                      src={bubble.src}
                      alt={`bubble-${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* {finished && (
        <Link to="Jeux/Memoire">
          <FinishedGame />
        </Link>
      )} */}
    </div>
  );
}
