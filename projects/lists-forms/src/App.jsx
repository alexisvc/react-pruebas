import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginForm } from "./components/LoginForm";
import PictogramForm from "./components/PictogramForm";
import RegistrationForm from "./components/RegistrationForm";
import { PictogramDisplay } from "./components/PictogramDisplay";
import RecognitionGame from "./components/Game/RecognitionGame";
import { useUser } from "./hooks/useUser";
import { usePictograms } from "./hooks/usePictograms";

import "./App.css"; // Importa el archivo CSS

function App() {
  const { user, logout, login } = useUser();
  const { pictograms, createPictogram } = usePictograms(user);

  const isLoggedIn = !!user;

  return (
    <div className="container">
      <Router>
        <ToastContainer />
        <div className="navbar">
          <div className="nav-links">
            {isLoggedIn && <button><Link to="/">Home</Link></button>}
            {!isLoggedIn && <button><Link to="/login">Login</Link></button>}
            {!isLoggedIn && <button><Link to="/register">Register</Link></button>}

            {isLoggedIn && (
              <>
                <button><Link to="/create">Create a new Pictogram</Link></button>
                <button><Link to="/saac">SAAC</Link></button>
                <button><Link to="/game">Game</Link></button>
                <button onClick={logout}>Logout</button>
              </>)}
          </div>
        </div>

        <div className="content">
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm login={login} />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/create" element={isLoggedIn ? <PictogramForm createPictogram={createPictogram} /> : <Navigate to="/login" />} />
            <Route path="/saac" element={<PictogramDisplay images={pictograms} />} />
            <Route path="/game" element={<RecognitionGame pictograms={pictograms} />} />
            <Route path="/" element={''} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
