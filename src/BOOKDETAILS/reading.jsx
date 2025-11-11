import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../PublicComponents/main.jsx";
import "./reading.css";

import prevButton from "/reading/prev.png";
import nextButton from "/reading/next.png";

import grass1 from "/backgrounds/grass1.png";
import grass2 from "/backgrounds/grass2.png";
import grass3 from "/backgrounds/grass3.png";
import grass4 from "/backgrounds/grass1.png";

function stringToHTML(htmlString) {
  return { __html: htmlString };
}

export function ReadingBook() {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [flipStates, setFlipStates] = useState([]);
  const [zIndexes, setZIndexes] = useState([]);
  const [openClass, setOpenClass] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
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
        setFlipStates(Array(data.pages.length).fill(false));
        setZIndexes(
          Array.from(
            { length: data.pages.length },
            (_, i) => data.pages.length - i
          )
        );
      } catch (error) {
        console.error("Erreur lors du chargement du livre :", error);
      }
    };

    fetchBook();
  }, [title]);

  const handleNext = (idx) => {
    if (idx === 0 || idx === book.pages.length - 1) {
      setOpenClass("open-book");
    }
    if (currentIndex < book.pages.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);

      setZIndexes((prev) => {
        const updated = [...prev];
        updated[newIndex] = book.pages.length + newIndex;
        return updated;
      });

      setTimeout(() => {
        setFlipStates((prev) =>
          prev.map((state, i) => (i === newIndex ? true : state))
        );
      }, 500);
    }
  };

  const handlePrevious = () => {
    if (currentIndex === 0 || currentIndex === book.pages.length - 1) {
      setOpenClass("open-book");
    }
    if (currentIndex >= 0) {
      const newIndex = currentIndex;
      setFlipStates((prev) =>
        prev.map((state, i) => (i === newIndex ? false : state))
      );

      setTimeout(() => {
        setZIndexes((prev) => {
          const updated = [...prev];
          updated[newIndex] = book.pages.length - newIndex;
          return updated;
        });

        setCurrentIndex((prev) => prev - 1);
      }, 500);
    }
  };

  if (!book) return <div>Chargement...</div>;

  return (
    <div className="reading">
      <div className="reading-flex global-container">
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
        <div className="middle-container">
          <Main className="main" />
          <div className="content-container">
            <div className="book-title">
              <h1 className="title">{book.title}</h1>
            </div>
            <div className={`book ${openClass}`}>
              {book.pages.map((page, index) => (
                <div
                  key={index}
                  className={`pages ${flipStates[index] ? "flip" : ""}`}
                  style={{ zIndex: zIndexes[index] }}
                >
                  <div className="front-page">
                    <img
                      onClick={() => handleNext(index)}
                      className="next"
                      src={nextButton}
                      alt="page suivante"
                    />
                    {page[0]?.text && (
                      <p
                        className={!page[0]?.imag ? "full-text" : ""}
                        dangerouslySetInnerHTML={stringToHTML(page[0].text)}
                      ></p>
                    )}
                    {page[0]?.imag && (
                      <img src={page[0].imag} alt="Page image" />
                    )}
                    {/* <button onClick={handleNext}>Suivante</button> */}
                  </div>
                  <div className="back-page">
                    <img
                      onClick={() => handlePrevious(index)}
                      className="back"
                      src={prevButton}
                      alt="page précédente"
                    />
                    {page[1]?.text && (
                      <p
                        className={!page[1]?.imag ? "full-text" : ""}
                        dangerouslySetInnerHTML={stringToHTML(page[1].text)}
                      ></p>
                    )}
                    {page[1]?.imag && (
                      <img src={page[1].imag} alt="Page image" />
                    )}
                    {/* <button onClick={handlePrevious}>Précédente</button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
