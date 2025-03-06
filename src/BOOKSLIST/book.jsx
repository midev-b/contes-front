import bookside from "./book-side.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./list.css";
export function Book({ cover, title, author, rating }) {
  return (
    <div className="book">
      <div className="card-hover">
        <img className="cover" src={cover} alt={`Livre: ${title}`} />

        <img className="book-top" src={bookside} />
        <img className="book-side" src={bookside} />
      </div>
      <div className="card-informations">
        <h3>{title}</h3>
        <p>Auteur: {author}</p>

        <div className="stars">
          {[...Array(5)].map((_, index) => {
            return (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                color={index < rating ? "yellow" : "black"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
