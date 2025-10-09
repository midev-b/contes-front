export const sendGameCompletion = async (gameName, isAuthenticated) => {
  if (!isAuthenticated) return;

  try {
    const response = await fetch("http://localhost:5001/api/completedGames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ gameName: gameName, completed: true }),
    });

    if (!response.ok)
      throw new Error("Impossible d'enregistrer la progression");

    console.log(`${gameName} complété !`);
  } catch (err) {
    console.error(err);
  }
};
