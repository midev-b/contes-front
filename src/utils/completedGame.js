export const sendGameCompletion = async (
  categoryName,
  gameName,
  isAuthenticated,
  trophy
) => {
  if (!isAuthenticated) return;

  try {
    const response = await fetch("http://localhost:5001/api/completedGames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        categoryName: categoryName,
        gameName: gameName,

        completed: true,
        trophy: trophy,
      }),
    });

    if (!response.ok) {
      throw new Error("Impossible d'enregistrer la progression");
    }
  } catch (err) {
    console.error(err);
  }
};
