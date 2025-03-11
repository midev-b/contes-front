// BookDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function BookDetails() {
  const { title } = useParams();
  const navigate = useNavigate();
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

        // Si l'utilisateur n'est pas authentifié (et le livre n'est pas gratuit), on redirige vers /login
        if (response.status === 401) {
          setIsDisconnected(true);
          setTimeout(navigate("/login"), 1500);

          return;
        }

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des détails du livre.");
        }

        const data = await response.json();
        setBook(data);
        setIsLiked(data.liked);
        setRating(data.rating);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookDetails();
  }, [title]);
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

  return (
    <div>
      {isDisconnected === true && (
        <FontAwesomeIcon icon={faHeart} color={isLiked ? "red" : "black"} />
      )}

      <h3>
        <img src={book.cover} />
      </h3>

      <h2>Détails du livre : {book.title}</h2>
      <p>{book.description}</p>
      {/* Par exemple, on peut afficher ici d'autres informations du livre */}
      <p>Accès : {book.isPublic ? "Gratuit" : "Réservé aux membres"}</p>
      {isDisconnected === true && (
        <div className="stars">
          {[...Array(5)].map((_, index) => {
            return (
              <FontAwesomeIcon
                onClick={() => submitRating(index + 1)}
                key={index}
                icon={faStar}
                color={index + 1 <= rating ? "yellow" : "black"}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
