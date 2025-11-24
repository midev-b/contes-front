import { DndContext } from "@dnd-kit/core";
import { DraggableImage } from "./draggableImg";
import { DroppableImage } from "./droppableImg";
import React, { useEffect, useState, useContext } from "react";

import { Link } from "react-router-dom";
import "./shadowGame.css";

import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import tree1 from "/GAMES/riddles/shadow/tree1.png";

import tree2 from "/GAMES/riddles/shadow/tree2.png";

import grass from "/GAMES/riddles/shadow/grass.png";
import back from "/GAMES/riddles/shadow/back.png";

export function ShadowPage() {
  const { isAuthenticated } = useContext(AuthContext);
  const [levels, setLevels] = useState([]); // contient tous les niveaux
  const [currentIndex, setCurrentIndex] = useState(0); // index du niveau en cours
  const [matched, setMatched] = useState({}); // ombres validées
  const [message, setMessage] = useState(""); // message Bravo/Faux

  // Charger les niveaux depuis l’API
  useEffect(() => {
    const fetchShadows = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/shadows");
        const data = await response.json();
        setLevels(data);
      } catch (err) {
        console.error("Erreur fetch shadows :", err);
      }
    };

    fetchShadows();
  }, []);

  // Logique quand on drop
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return; // si drop en dehors d’une zone, rien ne se passe

    const currentLevel = levels[currentIndex];

    if (active.id === over.id) {
      // ✅ correspondance correcte
      setMatched((prev) => ({ ...prev, [over.id]: true }));
      setMessage(" ✔️ Bravo !");

      // attendre un peu avant de passer au niveau suivant
      setTimeout(() => {
        setMessage("");
        if (currentIndex < levels.length - 1) {
          setCurrentIndex((prev) => prev + 1); // prochain niveau
          setMatched({}); // reset matched
        } else {
          setMessage("🏆 Jeu terminé !");

          sendGameCompletion("Enigme", "shadow", isAuthenticated);
        }
      }, 1500);
    } else {
      // ❌ mauvaise correspondance
      setMessage("❌ Faux ! Réessaie...");
      setTimeout(() => setMessage(""), 1000);
    }
  };

  // Chargement
  if (levels.length === 0) {
    return <p>Chargement...</p>;
  }

  // Niveau en cours
  const currentLevel = levels[currentIndex];

  return (
    <div className="shadow-game">
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
        <div className="question-shadow">
          <p>Associe l’animal à son ombre</p>
        </div>
        <img src={tree1} alt="tronc d'arbre " className="tree1" />
        <img src={tree2} alt="tronc d'arbre" className="tree2" />
        <img src={grass} alt="herbes" className="grass-bottom" />
        <Link to="/Jeux/Enigmes">
          <img src={back} alt="retour " className="back" />
        </Link>
        {/* Contexte DnD */}
        <div className="colored-black-img">
          <DndContext onDragEnd={handleDragEnd}>
            {/* Message Bravo/Faux */}
            <div className="message-images">
              <div className="message-answer">
                {message && <div className="message">{message}</div>}

                {/* --- SLOT DRAGGABLE --- */}
                <div className="draggable-slot">
                  {matched[currentLevel.correct] ? (
                    // ✅ Place vide si déjà posée
                    <div className="empty-place" />
                  ) : (
                    // 👉 Sinon on montre l'image draggable
                    <DraggableImage
                      id={currentLevel.id}
                      src={currentLevel.colored}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* --- OMBRES --- */}
            <div className="shadows">
              {currentLevel.shadows.map((shadow) => (
                <DroppableImage
                  key={shadow.id}
                  id={shadow.id}
                  src={
                    matched[shadow.id] && shadow.id === currentLevel.correct
                      ? currentLevel.colored // si bon match → image colorée
                      : shadow.src // sinon → ombre normale
                  }
                />
              ))}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
