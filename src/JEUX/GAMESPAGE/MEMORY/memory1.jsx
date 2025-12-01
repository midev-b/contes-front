import React, { useEffect, useState, useContext } from "react";
import "./memory1.css";
import { FinishedGame } from "../../../PublicComponents/finishedGame.jsx";

import { Link } from "react-router-dom";
import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
export function Memory1Page() {
  const { isAuthenticated } = useContext(AuthContext);
  const [memory, setMemory] = useState([]);

  const [verifyCards, setVerifyCards] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [finished, setFinished] = useState(false);
  const shuffleCard = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  useEffect(() => {
    if (memory.length > 0) {
      const flippedCount = memory.filter((card) => card.isFlipped).length;

      console.log("Cartes retournées :", flippedCount);

      // Si toutes les cartes sont retournées
      if (flippedCount === memory.length) {
        setTimeout(() => {
          setFinished(true);
        }, 1500);

        sendGameCompletion(
          "memory",
          "jeu de cartes",
          isAuthenticated,
          "Mémoire d'or"
        );
      }
    }

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
        }, 1000);
      } else {
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
          setVerifyCards([]);
        }, 1000);
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
        const response = await fetch("http://localhost:5001/api/memory1");
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
      <div className="middle-container-flex">
        <div className="middle-decoration">
          <img
            src="/GAMES/memory/memory1/tree.png"
            className="tree-decoration"
            alt="branche d'arbre"
          />

          <Link to="/Jeux/Memoire">
            <img
              src="/GAMES/memory/memory1/back.png"
              className="back"
              alt="retour"
            />
          </Link>
        </div>
        <div className="middle-container">
          {finished ? (
            <Link to="/Jeux/Memoire">
              <FinishedGame />{" "}
            </Link>
          ) : (
            ""
          )}
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
                  <img src="/GAMES/memory/front-card.jpg" alt={card.id} />
                </div>
                <div className="back-content">
                  <img src={card.src} alt={card.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
