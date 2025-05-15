import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./list.css";
import { Book } from "./book";
import { Main } from "../PublicComponents/main";
import logo from "/logos/logo.png";

export function BookList() {
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState("");

  const [error, setError] = useState(null);

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
        console.log("data endpoint", data.stories);

        setStories(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStories();
  }, [search]);

  return (
    <div className="book-list">
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
                <FontAwesomeIcon icon={faSearch} color="#d3c3ce" />
              </div>
            </div>
          </header>
          <div className="books-container">
            <div className="text-intro">
              <h2> Pattes & Plume </h2>
              <p>
                Clique sur un conte et plonge dans un monde magique rempli
                d'aventures incroyables!{" "}
              </p>
            </div>
            {stories.map((book, index) => {
              return (
                <Link key={index} to={`/histoires/${book.title}`}>
                  <Book
                    mark={book.isLiked}
                    cover={book.cover}
                    title={book.title}
                    author={book.author}
                    rating={book.rating}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
