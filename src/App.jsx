import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { BookList } from "./BOOKSLIST/list.jsx";
import { BookDetails } from "./BOOKDETAILS/bookDetails.jsx";
import { Register } from "./INSCRIPTION/register.jsx";
import { Login } from "./CONNEXION/login.jsx";
// import { Main } from "./PublicComponents/main.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/histoires" element={<BookList />}></Route>
        <Route path="/histoires/:title" element={<BookDetails />}>
          {" "}
        </Route>
        {/* <Route path="/games" element={<Games />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
