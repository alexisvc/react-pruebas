import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegistration } from "../hooks/useRegistration";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [user, setUser] = useState({ username: "", name: "", password: "" });
  const navigate = useNavigate();

  const { isRegistered, error, registerUser } = useRegistration();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!user.username || !user.name || !user.password) {
      return;
    }

    const registrationSuccess = await registerUser(user);
    if (registrationSuccess) {
      navigate("/login"); // Redirige al usuario al inicio de sesión después de registrarse
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirige al usuario a la página de inicio
  };

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      // Mostrar mensaje de error a través de Toast
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });

      // Limpiar los campos automáticamente si hay un error
      setUser({ username: "", name: "", password: "" });
    }
  }, [error]);

  return (
    <div>
      <h2>Register</h2>
      {isRegistered ? (
        <div>
          {/* Redirige al usuario a la página de inicio de sesión */}
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      ) : (
        <form onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <button type="submit" disabled={!user.username || !user.name || !user.password}>
              Register
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
