import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./itemTypes";

export function DropZone({ src, alt, correct, onCorrect }) {
  const [droppedItem, setDroppedItem] = useState(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.ANIMAL,
    drop: (item) => {
      if (item.src === correct) {
        setDroppedItem(item.src);
        onCorrect();

        setTimeout(() => setDroppedItem(null), 1000);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="drop-zone"
      style={{
        border: isOver ? "2px solid blue" : "2px dashed gray",
        width: "150px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative", // ✅ pour contenir l'image déposée
      }}
    >
      {/* Ombre affichée */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "120px",
          opacity: 0.5,
        }}
      />

      {/* Si un item correct a été déposé → on l’affiche par-dessus */}
      {droppedItem && (
        <img
          src={droppedItem}
          alt="dropped"
          style={{
            width: "120px",
            position: "absolute", // ✅ reste dans la zone
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)", // ✅ centré
          }}
        />
      )}
    </div>
  );
}
