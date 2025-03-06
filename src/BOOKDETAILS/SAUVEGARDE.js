// BookDetails.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export function BookDetails() {
  const { title } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [newLike, setNewLike] = useState(false);
  const [like, setLike] = useState(null);
  // const [newRating, setNewRating] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // On interroge le backend pour récupérer les détails du livre
        const response = await fetch(
          `http://localhost:5001/api/stories/${title}`,
          {
            method: "POST",

            headers: { "Content-Type": "application/json" },
            credentials: "include", // Permet d'envoyer automatiquement le cookie HTTPOnly contenant le token

            body: JSON.stringify({ isLiked: newLike }),
          }
        );

        // Si l'utilisateur n'est pas authentifié (et le livre n'est pas gratuit), on redirige vers /login
        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des détails du livre.");
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBookDetails();
  }, [title]);
  const handleLike = () => {
    setNewLike(!newLike);
  };
  if (error) return <div>{error}</div>;
  if (!book) return <div>Chargement...</div>;

  return (
    <div>
      <h2>Détails du livre : {book.title}</h2>
      <p>{book.description}</p>
      {/* Par exemple, on peut afficher ici d'autres informations du livre */}
      <p>Accès : {book.isPublic ? "Gratuit" : "Réservé aux membres"}</p>
      <button onClick={handleLike}>Ajouter aux favoris</button>
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          return (
            <FontAwesomeIcon
              key={index}
              icon={faStar}
              // color={index < rating ? "yellow" : "black"}
            />
          );
        })}
      </div>
    </div>
  );
}
