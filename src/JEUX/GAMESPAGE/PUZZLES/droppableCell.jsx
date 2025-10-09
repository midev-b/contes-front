import React from "react";
import { useDroppable } from "@dnd-kit/core";

/**
 * DroppableZone
 * Props :
 *  - id : identifiant unique (obligatoire)
 *  - children : élément(s) à afficher à l’intérieur (facultatif)
 *  - expectedId : si tu veux valider qu’une pièce spécifique tombe ici
 *  - width / height : dimensions
 */
export function DroppableCell({ id, children, width = 100, height = 100 }) {
  // Hook qui rend la zone "droppable"
  const { isOver, setNodeRef, active } = useDroppable({ id });

  // Style de la zone
  const style = {
    width,
    height,
    border: isOver ? "3px dashed green" : "2px dashed #aaa",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: isOver ? "#e3ffe3" : "#f8f8f8",
    transition: "all 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
