import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Main } from "../PublicComponents/main.jsx";
import "./bookDetails.css";

import bookTop from "/books/top-book.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

export function BookDetails() {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(null);
  const [isDisconnected, setIsDisconnected] = useState(null);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/stories/${title}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok)
          throw new Error("Erreur lors du chargement des détails du livre.");

        const data = await response.json();
        setBook(data);
        setIsLiked(data.liked);
        setRating(data.rating);
        setIsDisconnected(data.isDisconnected);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBookDetails();
  }, [title, isDisconnected]);

  const toggleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/stories/${title}/liking`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Erreur lors du like");
      const data = await response.json();
      setIsLiked(data.liked);
    } catch (err) {
      console.error("Erreur :", err);
    }
  };

  const submitRating = async (i) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/stories/${title}/rating`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ rating: i }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setRating(data.rating);
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div>{error}</div>;
  if (!book) return <div>Chargement...</div>;

  return (
    <div className="book-details">
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

      <div className="global-container">
        <div className="middle-container">
          <Main className="main" />

          <div className="content-container">
            <div className="left-container">
              <div className="book-container">
                <div className="cover-container">
                  {isDisconnected === false && (
                    <FontAwesomeIcon
                      onClick={toggleLike}
                      icon={faHeart}
                      color={isLiked ? "#b63131" : "#637f52"}
                      className="heart-icon"
                    />
                  )}
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="book-cover"
                  />
                </div>

                {isDisconnected === false && (
                  <div className="stars">
                    {[...Array(5)].map((_, index) => (
                      <FontAwesomeIcon
                        onClick={() => submitRating(index + 1)}
                        key={index}
                        icon={faStar}
                        color={index + 1 <= rating ? "#ddbe6c" : "#637052"}
                        className="star-icon"
                      />
                    ))}
                  </div>
                )}

                <div className="button-container">
                  <Link to={`/lecture/${title}`}>
                    <button className="read-btn">Lire</button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="right-container">
              <h1 className="book-title">{book.title}</h1>
              <h3 className="book-author">Auteur : {book.author}</h3>
              <div className="description-container">
                <p className="book-description">{book.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
