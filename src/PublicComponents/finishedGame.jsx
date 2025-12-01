import React from "react";
import accomplished from "/GAMES/finishedGame/pop-up.png";
import "./finishedGame.css";
export function FinishedGame() {
  return (
    <div className="accomplished">
      <img src={accomplished} alt="pop-up jeu terminé" />
    </div>
  );
}
