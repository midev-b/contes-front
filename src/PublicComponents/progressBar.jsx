import { useEffect, useState } from "react";
import "./progressBar.css";

export function ProgressBar({ category }) {
  const [error, setError] = useState();
  const [gamesInfo, setGamesInfo] = useState([]);
  const [completedGamesCount, setCompletedGamesCount] = useState(0);

  useEffect(() => {
    const fetchGameProgress = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/progress-games",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des jeux");
        }

        const data = await response.json();
        setGamesInfo(data);
        console.log("info", data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGameProgress();
  }, []); // ⬅️ on fetch uniquement au premier rendu

  // Calcul de la progression dès que gamesInfo change
  useEffect(() => {
    let progress = 0;

    gamesInfo.forEach((item) => {
      item.categories.forEach((cat) => {
        if (cat.name === category) {
          progress = cat.games.filter((g) => g.completed).length * 50;
        }
      });
    });

    setCompletedGamesCount(progress);
  }, [gamesInfo, category]); // ⬅️ recalcul seulement quand jeux ou catégorie changent

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="progress-bar-root">
        <div
          style={{
            width: `${completedGamesCount - 2}%`, // ⬅️ pourcentage (pas pixels)
          }}
          className="progress-bar-indicator"
        ></div>
      </div>
    </div>
  );
}
