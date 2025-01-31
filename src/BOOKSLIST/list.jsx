import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./list.css";
import bookside from "./book-side.svg";

const myBooks = [
  "/books/book1.jpg",
  "/books/book2.jpg",
  "/books/book3.jpg",
  "/books/book4.jpg",
  "/books/book5.jpg",
  "/books/book6.jpg",
  "/books/book7.jpg",
  "/books/book8.jpg",
  "/books/book9.jpg",
  "/books/book10.jpg",
  "/books/book11.jpg",
  "/books/book12.jpg",
  "/books/book13.jpg",
  "/books/book14.jpg",
  "/books/book15.jpg",
  "/books/book16.jpg",
  "/books/book17.jpg",
  "/books/book18.jpg",
  "/books/book19.jpg",
  "/books/book20.jpg",
  "/books/book21.jpg",
  "/books/book22.jpg",
];

export function BOOKSLIST() {
  return (
    <div className="global-container">
      <div className="middle-container">
        <header className="header-actions">
          <nav className="main">
            <a>Accueil</a>
            <a>Histoires</a>
            <a>Jeux</a>
            <a>Se connecter/S'inscrire</a>
          </nav>
          <div className="bar-search">
            <input type="text" placeholder="Rechercher..." />
            <div>
              <FontAwesomeIcon icon={faSearch} size="0.5g" color="black" />
            </div>
          </div>
        </header>
        <div className="books-container">
          <div className="text-intro">
            <p>
              Clique sur un conte et plonge dans un monde magique rempli
              d'aventures incroyables !
            </p>
          </div>
          {myBooks.map((book, index) => {
            return (
              <div className="book">
                <div className="card-hover">
                  <img
                    className="cover"
                    src={`${book}`}
                    alt={`livre ${index + 1}`}
                  />
                  <img className="book-top" src={bookside} />
                  <img className="book-side" src={bookside} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
