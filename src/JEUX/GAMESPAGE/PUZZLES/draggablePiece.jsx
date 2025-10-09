import { useDraggable } from "@dnd-kit/core";

export function DraggablePiece({ id, src }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(1.05)` // 5% zoom
      : undefined,
    width: "100px",
    height: "100px",
    transition: "transform 0.1s",
    margin: "5px",
    cursor: "grab",
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      src={src}
      alt={id}
    />
  );
}
