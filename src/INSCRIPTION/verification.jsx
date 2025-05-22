import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./verification.css";
import birdMessage from "/verification/bird-message.gif";

export function VerifyEmailPage() {
  const { token } = useParams();
  const [message, setMessage] = useState("Vérification en cours...");

  useEffect(() => {
    async function verifyEmail() {
      try {
        const response = await fetch(
          `http://localhost:5001/api/verify/${token}`
        );
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        } else {
          setMessage(data.message || "Erreur lors de la vérification.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Erreur de connexion au serveur.");
      }
    }

    verifyEmail();
  }, [token]);
  return (
    <div className="verification">
      <div className="verification-container">
        <div className="bird-container">
          <img
            className="bird-message"
            src={birdMessage}
            alt="oiseau portant une lettre"
          />
        </div>
        <div className="text-container">
          <h3>Vérification Email</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}
