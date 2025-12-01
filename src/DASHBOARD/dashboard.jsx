import React, { useEffect, useState } from "react";

export function Dashboard() {
  const [error, setError] = useState();
  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/userActivities",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des activités");
        }

        const data = await response.json();
        console.log(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserActivities();
  }, []);
}
