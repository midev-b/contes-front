import { useEffect, useState } from "react";

export function ProgressBar() {
  const [error, setError] = useState();
  const [gamesInfo, setGamesInfo] = useState([]); // tableau vide par défaut
  const [width, setWidth] = useState(0); // largeur de la barre

  // 1️⃣ Récupération des données de progression depuis le backend
  useEffect(() => {
    const fetchGameProgress = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/progress-games",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // envoie le cookie avec le token
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des jeux");
        }

        const data = await response.json();
        setGamesInfo(data.categories || []); // récupère le tableau des catégories
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGameProgress();
  }, []);

  // 2️⃣ Calcul de la largeur de la barre
  const getGamesInfo = () => {
    if (!gamesInfo || gamesInfo.length === 0) return;

    let completedCount = 0;

    gamesInfo.forEach((cat) => {
      completedCount += cat.games.filter((g) => g.completed).length;
    });

    setWidth(completedCount * 50); // mise à jour de la largeur
  };

  // 3️⃣ Mettre à jour width dès que gamesInfo change
  useEffect(() => {
    getGamesInfo();
  }, [gamesInfo]);

  // 4️⃣ JSX
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          width: "300px",
          height: "20px",
          background: "#ddd",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            width: `${width}px`,
            height: "100%",
            background: "green",
            transition: "width 0.5s ease",
          }}
        ></div>
      </div>
    </div>
  );
}
