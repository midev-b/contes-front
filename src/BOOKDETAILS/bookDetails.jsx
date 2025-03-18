// BookDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Main } from "../PublicComponents/main.jsx";
import "./bookDetails.css";
import bookTop from "/books/top-book.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

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
        // On interroge le backend pour récupérer les détails du livre
        const response = await fetch(
          `http://localhost:5001/api/stories/${title}`,
          {
            method: "GET",

            headers: { "Content-Type": "application/json" },
            credentials: "include", //Permet d'envoyer automatiquement le cookie HTTPOnly contenant le token
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des détails du livre.");
        }

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
    console.log(isDisconnected);
  }, [title, isDisconnected]);
  //////////////////
  const toggleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/stories/${title}/liking`,
        {
          method: "POST",
          credentials: "include", // 📌 Important pour envoyer le cookie
        }
      );

      if (!response.ok) throw new Error("Erreur lors du like");

      const data = await response.json();
      setIsLiked(data.liked); // 📌 Met à jour l'état du like
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
      setRating(data.rating);
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  if (error) return <div>{error}</div>;
  if (!book) return <div>Chargement...</div>;

  // return (
  //   <div className="book-details">
  //     <Main className="main" />
  //     <div className="global-container">
  //       <div className="book-container">
  //         {isDisconnected === false && (
  //           <FontAwesomeIcon icon={faHeart} color={isLiked ? "red" : "black"} />
  //         )}

  //         <h3>
  //           <img src={book.cover} />
  //         </h3>

  //         <h2>{book.title}</h2>
  //         <p>{book.description}</p>
  //         {/* Par exemple, on peut afficher ici d'autres informations du livre */}
  //         <p>Accès : {book.isPublic ? "Gratuit" : "Réservé aux membres"}</p>
  //         {isDisconnected === false && (
  //           <>
  //             <button onClick={toggleLike}>
  //               {isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
  //             </button>
  //             <div className="stars">
  //               {[...Array(5)].map((_, index) => {
  //                 return (
  //                   <FontAwesomeIcon
  //                     onClick={() => submitRating(index + 1)}
  //                     key={index}
  //                     icon={faStar}
  //                     color={index + 1 <= rating ? "yellow" : "black"}
  //                   />
  //                 );
  //               })}
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="book-details">
      <div className="global-container">
        {/* Partie principale (Gauche + Droite) */}
        <Main className="main"></Main>
        <div className="content-container">
          {/* Partie gauche */}
          <div className="left-container">
            <div className="book-container">
              <div className="cover-container">
                <img src={book.cover} alt={book.title} className="book-cover" />
                <img src={bookTop} className="bottom-book" />
              </div>
              <div className="button-group">
                <button className="read-btn">Lire</button>
                <button className="listen-btn">Écouter</button>
              </div>
            </div>
          </div>

          {/* Partie droite */}
          <div className="right-container">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">Auteur : {book.author}</p>
          </div>
        </div>

        {/* Description en bas */}
        <p className="book-description">{book.description}</p>
      </div>
    </div>
  );
}
