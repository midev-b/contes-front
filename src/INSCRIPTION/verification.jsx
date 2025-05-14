import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>Vérification Email</h1>
      <p>{message}</p>
    </div>
  );
}
