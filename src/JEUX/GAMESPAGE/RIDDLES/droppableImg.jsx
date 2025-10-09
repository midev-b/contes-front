// droppableImg.jsx
import { useDroppable } from "@dnd-kit/core";

export function DroppableImage({ id, src }) {
  // on rend la div "dropable"
  const { isOver, setNodeRef } = useDroppable({
    id, // identifiant unique de la zone
  });

  const style = {
    border: isOver ? "2px solid green" : "2px solid transparent",
    padding: "10px",
    display: "inline-block",
    margin: "5px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <img src={src} alt="shadow" width="100" />
    </div>
  );
}
