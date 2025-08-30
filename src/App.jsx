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
// import { Dashboard } from "./DASHBOARD/dashboard.jsx";
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
          <Route path="/register" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyEmailPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
