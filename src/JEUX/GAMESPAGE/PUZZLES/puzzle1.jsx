import React, { useEffect, useState, useContext } from "react";
import { DndContext } from "@dnd-kit/core";
import { DraggablePiece } from "./draggablePiece";
import { DroppableCell } from "./droppableCell";
import "./puzzle1.css";

import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

export function Puzzle1Page() {
  const { isAuthenticated } = useContext(AuthContext);
  const [puzzle, setPuzzle] = useState(null);
  const [placedPieces, setPlacedPieces] = useState({});
  const [message, setMessage] = useState("");
  const [addClass, setAddclass] = useState("");

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/puzzles");
        const data = await response.json();
        setPuzzle(data[0]);
      } catch (err) {
        console.error("Erreur fetch puzzles :", err);
      }
    };
    fetchPuzzle();
  }, []);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return; // si on drop hors grille, rien

    // ✅ correspondance directe : id de la pièce = id de la cellule
    if (active.id === over.id) {
      const piece = puzzle.pieces.find((p) => p.id === active.id);

      setPlacedPieces((prev) => {
        const newPlaced = { ...prev, [over.id]: piece };

        if (Object.keys(newPlaced).length === puzzle.pieces.length) {
          setAddclass("completed-puzzle");
          setMessage("Bravo 🎉");
          sendGameCompletion("Puzzles", "puzzle1", isAuthenticated);
        }

        return newPlaced;
      });
    }
  };

  if (!puzzle) return <p>Chargement du puzzle...</p>;

  // ✅ pièces sous image (6 premières) et sous grille (reste)
  const piecesUnderImg = puzzle.pieces.slice(0, 6);
  const piecesUnderGrid = puzzle.pieces.slice(6);

  return (
    <div className="puzzle1-container">
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
      <DndContext onDragEnd={handleDragEnd}>
        <div className="middle-container">
          <div className="message">{message}</div>
          <div className="game-container">
            {/* --- Partie gauche --- */}
            <div className="left-section">
              <div className="img-reference">
                <img src={puzzle.imgRef} alt="puzzle1" />
              </div>

              <div className="pieces-under-img">
                {piecesUnderImg.map(
                  (piece) =>
                    !placedPieces[piece.id] && (
                      <DraggablePiece
                        key={piece.id}
                        id={piece.id}
                        src={piece.src}
                      />
                    )
                )}
              </div>
            </div>

            {/* --- Partie droite --- */}
            <div className="right-section">
              <div className={`puzzle-zone ${addClass}`}>
                {puzzle.pieces.map((piece, index) => {
                  const cellId = `p${index + 1}`; // on crée un id basé sur la position
                  return (
                    <DroppableCell key={cellId} id={cellId}>
                      {placedPieces[cellId] && (
                        <img
                          src={placedPieces[cellId].src}
                          alt={cellId}
                          width="100"
                          height="100"
                        />
                      )}
                    </DroppableCell>
                  );
                })}
              </div>

              <div className="pieces-under-grid">
                {piecesUnderGrid.map(
                  (piece) =>
                    !placedPieces[piece.id] && (
                      <DraggablePiece
                        key={piece.id}
                        id={piece.id}
                        src={piece.src}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
}
