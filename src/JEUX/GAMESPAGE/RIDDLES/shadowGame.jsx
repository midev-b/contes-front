import { Main } from "../../../PublicComponents/main";
import { DndContext } from "@dnd-kit/core";
import { DraggableImage } from "./draggableImg";
import { DroppableImage } from "./droppableImg";
import React, { useEffect, useState, useContext } from "react";
import "./shadowGame.css";

import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

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
      setMessage("🎉 Bravo !");

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
      <Main />
      <div className="middle-container">
        <h3>Jeu des Ombres</h3>

        {/* Contexte DnD */}
        <DndContext onDragEnd={handleDragEnd}>
          {/* Message Bravo/Faux */}
          {message && <div className="message">{message}</div>}

          {/* --- SLOT DRAGGABLE --- */}
          <div className="draggable-slot">
            {matched[currentLevel.correct] ? (
              // ✅ Place vide si déjà posée
              <div className="empty-place" />
            ) : (
              // 👉 Sinon on montre l'image draggable
              <DraggableImage id={currentLevel.id} src={currentLevel.colored} />
            )}
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
  );
}
