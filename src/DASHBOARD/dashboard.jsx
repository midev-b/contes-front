import React, { useEffect, useState } from "react";

import { Main } from "../PublicComponents/main.jsx";
import "./dashboard.css";
import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";
import favoriteBooks from "/dashboard/favorite-book.png";
import accomplishedGames from "/dashboard/accomplished-games.png";
import myTrophies from "/dashboard/trophies.png";

export function Dashboard() {
  const [books, setBooks] = useState([]);
  const [gamesTrophies, setGamesTrophies] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/userActivities",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des activités");
        }

        const data = await response.json();
        console.log("dash", data);

        setBooks(data.stories);
        setGamesTrophies(data.completedGames);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserActivities();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Décor herbe */}
      <img src={grass1} alt="herbe gauche" className="grass grass-left" />
      <img src={grass2} alt="herbe droite" className="grass grass-right" />
      <img
        src={grass3}
        alt="herbe bas gauche"
        className="grass grass-bottom-left"
      />
      <img
        src={grass4}
        alt="herbe bas droite"
        className="grass grass-bottom-right"
      />

      <div className="middle-container">
        <Main className="main" />

        <div className="content-container">
          {/* ----------- FAVORITE BOOKS ---------- */}
          <div className="favorite-books">
            <div className="books-img">
              <img src={favoriteBooks} alt="Livres favoris" />
            </div>

            <div className="display-books">
              {books && books.length > 0 ? (
                books.map((book, index) => (
                  <div key={index} className="books-container">
                    <img src={book.cover} />
                    <p>{book.title}</p>
                  </div>
                ))
              ) : (
                <p>Aucun livre trouvé</p>
              )}
            </div>
          </div>

          {/* ----------- ACCOMPLISHED GAMES ---------- */}
          <div className="games-and-trophies">
            <div className="accomplished-games">
              <div className="games-img">
                <img src={accomplishedGames} alt="Jeux accomplis" />
              </div>

              <div className="display-games">
                {gamesTrophies && gamesTrophies.length > 0 ? (
                  gamesTrophies.map((item, index) =>
                    item.completedGames.map((itm) => (
                      <div key={index} className="games-container">
                        <p>{itm}</p>
                        <img src="/dashboard/game.png" />
                      </div>
                    ))
                  )
                ) : (
                  <p>Aucun jeu accompli</p>
                )}
              </div>
            </div>

            {/* ----------- TROPHIES ---------- */}
            <div className="trophies">
              <div className="trophies-img">
                <img src={myTrophies} alt="Trophées gagnés" />
              </div>
              <div className="display-trophies">
                {gamesTrophies && gamesTrophies.length > 0 ? (
                  gamesTrophies.map((item, index) =>
                    item.trophy ? (
                      <div key={index} className="trophies-container">
                        <img src={item.image} alt="trophée " />
                        <p>{item.trophy}</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                ) : (
                  <p> Aucun trophée </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
