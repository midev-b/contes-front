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
    // JE T EXPLIQUE RPIDEMENT ICI C EST LE USEEFFECT QUI PERME D AFFICHER LES BULLES ? celle a retenir pis celles a cliquer
    if (memoBubbles.length === 0) return;
    setDisplayBubbles(memoBubbles[currentIndex].cards); // A RETENIR
    setDisplayBubblesNew(memoBubbles[currentIndex].cards); //  UNE COPIE CAR LE PREMIER DOIT DISPARAITRE EET CELUI CA SERT A COMPARER

    setTimeout(() => {
      setDisplayBubbles([]);
      setQuestionsBubbles(memoBubbles[currentIndex].questionsCards); // CELI OU L ENFANT FOIT LIQUER
    }, 6000);
  }, [currentIndex, memoBubbles]);

  const handleBubbles = (index) => {
    questionsBubbles.map((question, i) => {
      const exists = displayBubblesNew.filter((el) => el.id === question.id);
      // console.log(exists, "AAAAAAAA");

      if (index === i && exists) {
        // console.log("EXIST", exists);
        setBubbleClass("invisible");
        setAnswers((prevAnswers) => {
          return [...prevAnswers, exists];
        });
      }
    });
    console.log(answers);
    if (answers.length === displayBubblesNew.length) {
      setCurrentIndex(currentIndex + 1);
      setDisplayBubblesNew([]);
      setDisplayBubbles([]);
      setAnswers([]);
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
          {displayBubbles.map((bubble, index) => {
            return (
              <div key={index} className={`bubble ${index}`}>
                <img src={bubble.src} />
              </div>
            );
          })}
          {questionsBubbles.map((bubble, index) => {
            return (
              <div key={index}>
                <div
                  className="questions-bubbles"
                  onClick={() => {
                    handleBubbles(index);
                  }}
                >
                  <img src={bubble.src} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
