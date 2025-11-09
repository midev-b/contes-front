import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./list.css";
import { Book } from "./book";
import { Main } from "../PublicComponents/main";
import owlIcon from "/toast/owl.png";
import grass1 from "/backgrounds/grass1.png";

import grass2 from "/backgrounds/grass2.png";

import grass3 from "/backgrounds/grass3.png";

import grass4 from "/backgrounds/grass1.png";

import { useContext } from "react";
import { AuthContext } from "../App";
export function BookList() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/stories?search=${search}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Problème de chargement...");
        }

        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStories();
  }, [search]);

  const handleClick = (book) => {
    console.log(stories);
    if (book.isPublic || isAuthenticated) {
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
    <div className="book-list">
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
          <header className="header-actions">
            <Main />
            <div className="bar-search">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                <FontAwesomeIcon icon={faSearch} color="#b4c29c" />
              </div>
            </div>
          </header>

          <div className="books-container">
            <div className="text-intro">
              <h2>Pattes & Plume</h2>
              <p>
                Clique sur un conte et plonge dans un monde magique rempli
                d'aventures incroyables!
              </p>
            </div>

            {stories.map((book, index) => (
              <div key={index} onClick={() => handleClick(book)}>
                <Book
                  mark={book.isLiked}
                  cover={book.cover}
                  title={book.title}
                  author={book.author}
                  rating={book.rating}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
