import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginForm } from "./components/LoginForm";
import PictogramForm from "./components/PictogramForm";
import { PictogramDisplay } from "./components/PictogramDisplay";
import RecognitionGame from "./components/Game/RecognitionGame";
import { useUser } from "./hooks/useUser";
import { usePictograms } from "./hooks/usePictograms";

function App() {
  const { user, logout, login } = useUser();
  const { pictograms, createPictogram } = usePictograms(user);

  const isLoggedIn = !!user;

  return (
    <Router>
      <ToastContainer />
      <nav>
        <div>
          {isLoggedIn && <button><Link to="/">Home</Link></button>}
          {!isLoggedIn && <button><Link to="/login">Login</Link></button>}
          {!isLoggedIn && <button><Link to="/register">Register</Link></button>}
          {isLoggedIn && <button onClick={logout}>Logout</button>}
        </div>
        {isLoggedIn && (
          <div>
            <button><Link to="/create">Create a new Pictogram</Link></button>
            <button><Link to="/saac">SAAC</Link></button>
            <button><Link to="/game">Game</Link></button>
          </div>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm login={login} />} />
        <Route path="/register" element={''} />
        <Route path="/create" element={isLoggedIn ? <PictogramForm createPictogram={createPictogram} /> : <Navigate to="/login" />} />
        <Route path="/saac" element={<PictogramDisplay images={pictograms} />} />
        <Route path="/game" element={<RecognitionGame pictograms={pictograms} />} />
        <Route path="/" element={''} />
      </Routes>
    </Router>
  );
}

export default App;
