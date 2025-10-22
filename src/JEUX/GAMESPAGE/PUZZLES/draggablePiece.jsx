import { useDraggable } from "@dnd-kit/core";

export function DraggablePiece({ id, src }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const translate = transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined;

  const style = {
    transform: translate,
    // width: "100px",
    // height: "100px",
    transition: "transform 0.1s",
    margin: "5px",
    cursor: "grab",
    touchAction: "none",
  };

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      src={src}
      alt={id}
      draggable={false}
    />
  );
}
