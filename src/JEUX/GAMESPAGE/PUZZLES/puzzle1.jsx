import React, { useEffect, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { DraggablePiece } from "./draggablePiece";
import { DroppableCell } from "./droppableCell";
import "./puzzle1.css";

export function Puzzle1Page() {
  const [puzzle, setPuzzle] = useState(null);
  const [placedPieces, setPlacedPieces] = useState({});

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
    if (!active) return;

    if (over && over.id && active.id === over.id) {
      const placedPiece = puzzle.pieces.find((p) => p.id === active.id);
      setPlacedPieces((prev) => ({
        ...prev,
        [active.id]: placedPiece,
      }));
    }
  };

  if (!puzzle) return <p>Chargement du puzzle...</p>;

  // const piecesLeft = puzzle.pieces.slice(0, 3);
  // const piecesRight = puzzle.pieces.slice(3);

  return (
    <div className="puzzle1-container">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="middle-container">
          <div className="image-and-puzzle-container">
            <div className="img-reference">
              <img src={puzzle.imgRef} alt="puzzle1" />
            </div>

            <div className="puzzle-zone">
              {puzzle.pieces.map((piece) => (
                <DroppableCell key={piece.id} id={piece.id}>
                  {placedPieces[piece.id] && (
                    <img
                      src={placedPieces[piece.id].src}
                      alt={piece.id}
                      // width="100"
                      // height="100"
                    />
                  )}
                </DroppableCell>
              ))}
            </div>
          </div>
          <div className="pieces-container">
            <div className="pieces-puzzle">
              {puzzle.pieces.map(
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
      </DndContext>
    </div>
  );
}
