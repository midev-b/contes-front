import { useDraggable } from "@dnd-kit/core";
export function DraggableImage({ id, src }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <img
      ref={setNodeRef} // relie l’élément au système
      {...listeners} // gère les événements (souris, tactile…)
      {...attributes} // ajoute accessibilité
      style={style} // applique la position pendant le drag
      src={src} // ton image API ici
      alt="draggable"
    />
  );
}
