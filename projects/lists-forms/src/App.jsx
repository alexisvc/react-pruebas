import "./App.css";
import { useState, useEffect } from "react";
import { Pictogram } from "./components/Pictogram";

import pictogramServices from "./services/pictograms";
import loginServices from "./services/login";
import { LoginForm } from "./components/LoginForm";
import NoteForm from "./components/PictogramForm";

function App() {
  const [pictograms, setPictograms] = useState([]);
  const [loading, setLoading] = useState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("useEffect");
    setLoading(true);
    // Llamada al servicio para obtener todos los pictogramas
    pictogramServices.getAllPictograms().then((response) => {
      setPictograms(response);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      pictogramServices.setToken(user.token)
    }
  }, []);

  const handleLogout = () => {
    setUser(null)
    pictogramServices.setToken(user.token)
    window.localStorage.removeItem("loggedUser")
  }

  const createPictogram = (pictogramObject) => {
    pictogramServices
      .createPictogram(pictogramObject)
      .then((newPictogram) => {
        setPictograms(pictograms.concat(newPictogram));
      })
      .catch((error) => {
        console.error("Error al crear el pictograma:", error);
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login", username, password)

    try {
      const user = await loginServices.login({ username, password })
      // Guardamos el usuario en el localStorage
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      // Guardamos el token en el servicio de pictogramas
      pictogramServices.setToken(user.token)
      // Guardamos el usuario en el estado de la aplicación
      setUser(user)
      setUsername("")
      setPassword("")
      console.log("User", user)
    } catch (error) {
      console.error("Error al hacer login:", error)
    }
  }

  return (
    <>
      {
        user
          ? <NoteForm 
              createPictogram={createPictogram}
              handleLogout={handleLogout}
            />
          : <LoginForm 
              username={username}
              password={password}
              handleUsernameChange={(e) => setUsername(e.target.value)}
              handlePasswordChange={(e) => setPassword(e.target.value)}
              handleLoginSubmit={handleLoginSubmit}
            />
      }

      <h1>Pictogramas</h1>
      {loading ? <p>Cargando...</p> : null}{" "}
      {/*Si loading es true, muestra el mensaje*/}
      {pictograms.map((pictogram) => (
        <Pictogram key={pictogram.id} pictogram={pictogram} />
      ))}
    </>
  );
}

export default App;
