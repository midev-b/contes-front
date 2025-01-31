import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./list.css";
import bookside from "./books/book-side.svg";

import book1 from "./books/book1.jpg";
import book2 from "./books/book2.jpg";
import book3 from "./books/book3.jpg";
import book4 from "./books/book4.jpg";
import book5 from "./books/book5.jpg";
import book6 from "./books/book6.jpg";
import book7 from "./books/book7.jpg";
import book8 from "./books/book8.jpg";
import book9 from "./books/book9.jpg";
import book10 from "./books/book10.jpg";
import book11 from "./books/book11.jpg";
import book12 from "./books/book12.jpg";
import book13 from "./books/book13.jpg";
import book14 from "./books/book14.jpg";
import book15 from "./books/book15.jpg";
import book16 from "./books/book16.jpg";
import book17 from "./books/book17.jpg";
import book18 from "./books/book18.jpg";
import book19 from "./books/book19.jpg";
import book20 from "./books/book20.jpg";
import book21 from "./books/book21.jpg";
import book22 from "./books/book22.jpg";
const myBooks = [
  book1,
  book2,
  book3,
  book4,
  book5,
  book6,
  book7,
  book8,
  book9,
  book10,
  book11,
  book12,
  book13,
  book14,
  book15,
  book16,
  book17,
  book18,
  book19,
  book20,
  book21,
  book22,
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
