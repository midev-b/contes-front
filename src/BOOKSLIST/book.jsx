import bookside from "./book-side.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { faLock } from "@fortawesome/free-solid-svg-icons";

import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "./list.css";
export function Book({ mark, cover, title, author, rating }) {
  let icon = null;
  if (mark === "lock") {
    icon = <FontAwesomeIcon className="lock-icon" icon={faLock} size="100xl" />;
  } else if (mark === false) {
    icon = (
      <FontAwesomeIcon
        className="heart-unlike-icon"
        icon={faHeart}
        size="100xl"
      />
    );
  } else if (mark === true) {
    icon = (
      <FontAwesomeIcon
        className="heart-like-icon"
        icon={faHeart}
        size="100xl"
      />
    );
  } else {
    icon = null;
  }

  return (
    <div className="book">
      <div className="icon">{icon}</div>
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
