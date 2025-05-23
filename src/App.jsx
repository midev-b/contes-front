import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./HOME/home.jsx";
import { BookList } from "./BOOKSLIST/list.jsx";
import { BookDetails } from "./BOOKDETAILS/bookDetails.jsx";
import { ReadingBook } from "./BOOKDETAILS/reading.jsx";
import { Register } from "./INSCRIPTION/register.jsx";
import { VerifyEmailPage } from "./INSCRIPTION/verification.jsx";
import { Login } from "./CONNEXION/login.jsx";
// import { Dashboard } from "./DASHBOARD/dashboard.jsx";
// 👉 Ajout du style Toastify
import "react-toastify/dist/ReactToastify.css";
// 👉 Import du conteneur Toast
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/histoires" element={<BookList />} />
        <Route path="/histoires/:title" element={<BookDetails />} />
        <Route path="/lecture/:title" element={<ReadingBook />} />
        {/* <Route path="/games" element={<Games />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<VerifyEmailPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
