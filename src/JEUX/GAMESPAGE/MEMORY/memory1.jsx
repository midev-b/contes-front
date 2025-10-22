import React, { useEffect, useState } from "react";
import "./memory1.css";

export function Memory1Page() {
  const [memory, setMemory] = useState([]);

  const [verifyCards, setVerifyCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const shuffleCard = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  useEffect(() => {
    if (verifyCards.length === 2) {
      if (verifyCards[0].id !== verifyCards[1].id) {
        setIsDisabled(true);
        setTimeout(() => {
          setMemory((prevMemory) => {
            return prevMemory.map((card) => {
              if (
                verifyCards[0].id === card.id ||
                verifyCards[1].id === card.id
              ) {
                console.log("card", card);
                return { ...card, isFlipped: false };
              }
              return card;
            });
          });

          setIsDisabled(false);

          setVerifyCards([]);
        }, 4000);
      } else {
        setTimeout(() => {
          setIsDisabled(true);
          setVerifyCards([]);
        }, 4000);
      }
    }
  }, [verifyCards]);

  const flipCard = (index) => {
    setMemory((prev) =>
      prev.map((card, i) => {
        if (i === index) {
          setVerifyCards((prev) => [...prev, card]);
          return { ...card, isFlipped: true };
        }
        return card;
      })
    );
  };

  useEffect(() => {
    const fetchMemoryCards = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/memory");
        const data = await response.json();
        setMemory(shuffleCard(data[0].memo));
      } catch (err) {
        console.error("erreur fetch :", err);
      }
    };
    fetchMemoryCards();
  }, []);
  console.log(memory);
  if (!memory.length) return <p>Chargement des cartes...</p>;

  return (
    <div className="memory1-container">
      <div className="middle-container">
        <div className="game-container">
          {memory.map((card, index) => (
            <div
              key={index}
              className={`cards ${card.isFlipped ? "flipped" : ""}`}
              onClick={() => {
                if (isDisabled || card.isFlipped) {
                  return;
                }

                flipCard(index);
              }}
            >
              <div className="front-content">
                <img src="/GAMES/memory/front-card.png" alt={card.id} />
              </div>
              <div className="back-content">
                <img src={card.src} alt={card.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
