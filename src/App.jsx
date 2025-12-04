import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./HOME/home.jsx";
import { BookList } from "./BOOKSLIST/list.jsx";
import { BookDetails } from "./BOOKDETAILS/bookDetails.jsx";
import { ReadingBook } from "./BOOKDETAILS/reading.jsx";
import { Register } from "./INSCRIPTION/register.jsx";
import { VerifyEmailPage } from "./INSCRIPTION/verification.jsx";
import { Login } from "./CONNEXION/login.jsx";
import { GamesPage } from "./JEUX/games.jsx";
import { RiddlesPage } from "./JEUX/GAMESPAGE/RIDDLES/riddles.jsx";
import { QuizPage } from "./JEUX/GAMESPAGE/RIDDLES/quizGame.jsx";
import { ShadowPage } from "./JEUX/GAMESPAGE/RIDDLES/shadowGame.jsx";
import { PuzzlesPage } from "./JEUX/GAMESPAGE/PUZZLES/puzzles.jsx";
import { Puzzle1Page } from "./JEUX/GAMESPAGE/PUZZLES/puzzle1.jsx";
import { MemoryPage } from "./JEUX/GAMESPAGE/MEMORY/memory.jsx";
import { Memory1Page } from "./JEUX/GAMESPAGE/MEMORY/memory1.jsx";
import { Memory2Page } from "./JEUX/GAMESPAGE/MEMORY/memory2.jsx";

import { Puzzle2Page } from "./JEUX/GAMESPAGE/PUZZLES/puzzle2.jsx";
import { Dashboard } from "./DASHBOARD/dashboard.jsx";
// 👉 Ajout du style Toastify
import "react-toastify/dist/ReactToastify.css";
// 👉 Import du conteneur Toast
import { ToastContainer } from "react-toastify";
import { createContext, useState } from "react";
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/histoires" element={<BookList />} />
          <Route path="/histoires/:title" element={<BookDetails />} />
          <Route path="/lecture/:title" element={<ReadingBook />} />
          <Route path="/jeux" element={<GamesPage />} />
          <Route path="/jeux/enigmes" element={<RiddlesPage />} />
          <Route path="/jeux/enigmes/quiz" element={<QuizPage />} />
          <Route path="/jeux/enigmes/ombres" element={<ShadowPage />} />
          <Route path="/jeux/puzzles" element={<PuzzlesPage />} />
          <Route path="jeux/puzzles/puzzle1" element={<Puzzle1Page />} />
          <Route path="jeux/puzzles/puzzle2" element={<Puzzle2Page />} />
          <Route path="jeux/Memoire" element={<MemoryPage />} />
          <Route path="jeux/Memoire/memoire1" element={<Memory1Page />} />

          <Route path="jeux/Memoire/memoire2" element={<Memory2Page />} />

          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmailPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
