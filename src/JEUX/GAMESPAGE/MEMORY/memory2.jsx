import React, { useEffect, useState } from "react";
import "./memory2.css";

export function Memory2Page() {
  const [memoBubbles, setMemoBubbles] = useState([]);
  const [displayBubbles, setDisplayBubbles] = useState([]);
  const [displayBubblesNew, setDisplayBubblesNew] = useState([]);

  const [questionsBubbles, setQuestionsBubbles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [bubbleClass, setBubbleClass] = useState();
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

    if (present && !answers.includes(present)) {
      setAnswers((prev) => {
        const newAnswers = [...prev, present];
        console.log(newAnswers, "aa");
        if (newAnswers.length === displayBubblesNew.length) {
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1);
            setDisplayBubblesNew([]);
            setDisplayBubbles([]);
            setAnswers([]);
            console.log(newAnswers, "bb");

            return [];
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
      <div className="middle-container">
        <div className="game-container">
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
          {displayBubbles.length === 0 && (
            <div className="questions-bubbles-container">
              <div className="questions-bubbles">
                <p>Clique sur les animaux que tu as vus</p>
                {questionsBubbles.map((bubble, index) => (
                  <div
                    key={index}
                    className="question-bubble"
                    onClick={() => handleBubbles(bubble.id)}
                  >
                    <img src={bubble.src} alt={`bubble-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
