import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Main } from "../PublicComponents/main.jsx";
import "./home.css";

export function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/popular");

        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des livres populaires."
          );
        }

        const data = await response.json();
        setTopBooks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTopBooks();
  }, []);
  return (
    <div className=" home global-container">
      <div className="middle-container">
        <Main className="main" />
        <div className="intro-message">
          <h1>Bienvenue dans l’univers de Pattes & Plume</h1>
          <div className="intro-text">
            <p>
              Prêt(e) pour une aventure dans le monde des animaux ? Chaque livre
              te raconte une histoire pleine de rires, de courage et de
              surprises. Viens tourner les pages, un univers merveilleux
              t’attend{" "}
            </p>
          </div>
        </div>
        <div className="books-title-container">
          <h3>Contes les plus populaires en ce moment</h3>
          <div className="books-container">
            {topBooks.map((book, index) => (
              <Link key={index} to={`/histoires/${book.title}`}>
                <div className="book">
                  <img src={book.cover} alt={book.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
