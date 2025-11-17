import React, { useEffect, useState, useContext } from "react";
import { DndContext } from "@dnd-kit/core";
import { DraggablePiece } from "./draggablePiece";
import { DroppableCell } from "./droppableCell";
import "./puzzle2.css";

import { AuthContext } from "../../../App";
import { sendGameCompletion } from "../../../utils/completedGame.js";

export function Puzzle2Page() {
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
        setPuzzle(data[1]); // ✅ on prend le deuxième puzzle
      } catch (err) {
        console.error("Erreur fetch puzzles :", err);
      }
    };
    fetchPuzzle();
  }, []);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over) return;

    if (active.id === over.id) {
      const piece = puzzle.pieces.find((p) => p.id === active.id);

      setPlacedPieces((prev) => {
        const newPlaced = { ...prev, [over.id]: piece };

        if (Object.keys(newPlaced).length === puzzle.pieces.length) {
          setAddclass("completed-puzzle");
          setMessage("Bravo 🎉");
          sendGameCompletion("Puzzles", "puzzle2", isAuthenticated);
        }

        return newPlaced;
      });
    }
  };

  if (!puzzle) return <p>Chargement du puzzle...</p>;

  // ✅ pièces : moitié au-dessus de l’image, moitié sous la grille
  const piecesUnderImg = puzzle.pieces.slice(0, 8);
  const piecesUnderGrid = puzzle.pieces.slice(8);

  return (
    <div className="puzzle2-container">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="middle-container">
          <div className="message">{message}</div>

          <div className="game-container">
            {/* --- Partie gauche --- */}
            <div className="left-section">
              <div className="img-reference">
                <img src={puzzle.imgRef} alt="puzzle2" />
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
                  const cellId = `p${index + 1}`;
                  return (
                    <DroppableCell key={cellId} id={cellId}>
                      {placedPieces[cellId] && (
                        <img
                          src={placedPieces[cellId].src}
                          alt={cellId}
                          className="puzzle2-piece-img"
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
