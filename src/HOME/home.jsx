import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Main } from "../PublicComponents/main.jsx";
import "./home.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import owlIcon from "/toast/owl.png";

import { useContext } from "react";
import { AuthContext } from "../App";
export function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

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

  const navigate = useNavigate();
  const handleClick = (book) => {
    if (book.isPublic || isAuthenticated === true) {
      console.log(isAuthenticated);
      navigate(`/histoires/${book.title}`);
    } else {
      toast.info("Réservé aux membres abonnés, abonne-toi pour y accéder.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: true,
        icon: <img src={owlIcon} alt="hibou" className="toast-owl-icon" />,
        className: "custom-toast",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

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
              t’attend!{" "}
            </p>
          </div>
        </div>
        <div className="books-title-container">
          <h3>Contes les plus populaires en ce moment</h3>
          <div className="books-container">
            {topBooks.map((book, index) => (
              <div
                key={index}
                className="book "
                onClick={() => handleClick(book)}
              >
                <img src={book.cover} alt={book.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
