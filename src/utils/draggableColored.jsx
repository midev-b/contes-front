// src/components/DraggableColored.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./itemTypes";

export function DraggableColored({ src, alt }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.ANIMAL, // même type que la drop zone
    item: { src }, // ✅ chaque image envoie bien son propre src
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // ✅ correction ici
    }),
  }));

  return (
    <img
      ref={drag}
      src={src}
      alt={alt}
      style={{
        width: "120px",
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
    />
  );
}
