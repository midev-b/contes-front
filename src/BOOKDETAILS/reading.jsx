// import React, { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";

// import { Main } from "../PublicComponents/main.jsx";
// import "./reading.css";
// function stringToHTML(htmlString) {
//   return { __html: htmlString };
// }

// export function ReadingBook() {
//   const { title } = useParams(); // On récupère le titre de l’URL
//   const [book, setBook] = useState(null);

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/api/stories/${title}`
//         );
//         const data = await response.json();
//         setBook(data);
//         console.log(data);
//       } catch (error) {
//         console.error("Erreur lors du chargement du livre :", error);
//       }
//     };

//     fetchBook();
//   }, [title]);

//   if (!book) return <div>Chargement...</div>;

//   return (
//     <div className=" reading global-container">
//       <div className="middle-container">
//         <Main className="main"></Main>
//         <div className="book">
//           {book.pages.map((page, index) => {
//             return (
//               <div key={index} className="pages">
//                 <div style={{ zIndex: index }} className="front-page">
//                   {page[0]?.text && (
//                     <p dangerouslySetInnerHTML={stringToHTML(page[0].text)}></p>
//                   )}
//                   {page[0]?.imag && <img src={page[0].imag} alt="Page image" />}
//                 </div>
//                 <div className="back-page">
//                   {page[1]?.text && (
//                     <p dangerouslySetInnerHTML={stringToHTML(page[1].text)}></p>
//                   )}
//                   {page[1]?.imag && <img src={page[1].imag} alt="Page image" />}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../PublicComponents/main.jsx";
import "./reading.css";

function stringToHTML(htmlString) {
  return { __html: htmlString };
}

export function ReadingBook() {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [flipStates, setFlipStates] = useState([]);
  const [zIndexes, setZIndexes] = useState([]);

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

  const handleNext = () => {
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
    <div className="reading global-container">
      <div className="middle-container">
        <Main className="main" />
        <div className="book">
          {book.pages.map((page, index) => (
            <div
              key={index}
              className={`pages ${flipStates[index] ? "flip" : ""}`}
              style={{ zIndex: zIndexes[index] }}
            >
              <div className="front-page">
                {page[0]?.text && (
                  <p dangerouslySetInnerHTML={stringToHTML(page[0].text)}></p>
                )}
                {page[0]?.imag && <img src={page[0].imag} alt="Page image" />}
                <button onClick={handleNext}>Suivante</button>
              </div>
              <div className="back-page">
                {page[1]?.text && (
                  <p dangerouslySetInnerHTML={stringToHTML(page[1].text)}></p>
                )}
                {page[1]?.imag && <img src={page[1].imag} alt="Page image" />}
                <button onClick={handlePrevious}>Précédente</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
