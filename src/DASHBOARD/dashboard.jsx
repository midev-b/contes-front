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
  const [currentIndex, setCurrentIndex] = useState(0);

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
        console.log({ data });
        setBooks(data.stories);
        setGamesTrophies(data.completedGames);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserActivities();
  }, []);
  const visibleBooks =
    books && books.length > 0
      ? books.slice(currentIndex, currentIndex + 3)
      : [];

  const nextBooks = () => {
    if (currentIndex + 3 < books.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevBooks = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const deleteBook = async (bookTitle) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/removeBook/${bookTitle}`,
        {
          method: "PUT",

          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await response.json();

      setBooks(data);
      console.log("new", data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <>
                  {/* Flèche précédente */}
                  {books.length > 3 ? (
                    <img
                      onClick={prevBooks}
                      className="previous"
                      src="/dashboard/back.png"
                      alt="previous"
                    />
                  ) : (
                    ""
                  )}

                  {/* Livres visibles */}
                  {visibleBooks.map((book, index) => (
                    <div key={index} className="books-container ">
                      <img
                        onClick={() => {
                          deleteBook(book.title);
                        }}
                        className="close"
                        src="/dashboard/close.png"
                        alt="fermer"
                      />
                      <img src={book.cover} alt={book.title} />
                      <p>{book.title}</p>
                    </div>
                  ))}

                  {/* Flèche suivante */}
                  {books.length > 3 ? (
                    <img
                      onClick={nextBooks}
                      src="/dashboard/next.png"
                      className="next"
                      alt="next"
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p className="no-result">
                  Tu n'as pas encore de livres favoris
                </p>
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
                    item.completedGames.map((itm, i) => (
                      <div key={`${index}-${i}`} className="games-container">
                        <img
                          className="close"
                          src="/dashboard/close.png"
                          alt="fermer"
                        />
                        <img src="/dashboard/game.png" alt="jeu" />
                        <p>{itm}</p>
                      </div>
                    ))
                  )
                ) : (
                  <p className="no-result">
                    Tu n'as aucun jeu accompli pour le moment{" "}
                  </p>
                )}
              </div>
            </div>

            {/* ----------- TROPHIES ---------- */}
            <div className="trophies">
              <div className="trophies-img">
                <img
                  className="tree-trophy"
                  src={myTrophies}
                  alt="Trophées gagnés"
                />
              </div>

              <div className="display-trophies">
                {gamesTrophies && gamesTrophies.length > 0 ? (
                  gamesTrophies.map((item, index) =>
                    item.trophy ? (
                      <div key={index} className="trophies-container">
                        <img
                          className="close"
                          src="/dashboard/close.png"
                          alt="fermer"
                        />
                        <img src={item.image} alt="trophée" />
                        <p>{item.trophy}</p>
                      </div>
                    ) : (
                      ""
                    )
                  )
                ) : (
                  <p className="no-result">
                    Tu n'as gagné aucun trophée pour le moment{" "}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
