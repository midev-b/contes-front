import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function DroppableCell({ id, children, width, height }) {
  // Hook qui rend la zone "droppable"
  const { isOver, setNodeRef, active } = useDroppable({ id });

  // Style de la zone
  const style = {
    width,
    height,
    border: isOver ? "0.2px dashed green" : "0.2px solid #8f8174",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: isOver ? "#e3ffe3" : "#f3e6d4",
    transition: "all 0.2s ease",
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}
