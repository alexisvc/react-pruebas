import "./App.css";
import { useState, useEffect } from "react";
import { Pictogram } from "./components/Pictogram";

import pictogramServices from "./services/pictograms";
import loginServices from "./services/login";
import { LoginForm } from "./components/LoginForm";
import PictogramForm from "./components/PictogramForm";
import { PictogramDisplay } from "./components/PictogramDisplay";

function App() {
  const [pictograms, setPictograms] = useState([]);
  const [loading, setLoading] = useState();
  const [user, setUser] = useState(null);

  useEffect(() => {
  setLoading(true);
  if (user) {
    pictogramServices.getPictogramsByUserId(user.id).then((response) => {
      setPictograms(response);
      setLoading(false);
    });
  }
}, [user]);


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

  const loginUser = async (username, password) => {
    try {
      const user = await loginServices.login( username, password )
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      pictogramServices.setToken(user.token)
      setUser(user)
      console.log("Login exitoso:", user)
    } catch (error) {
      console.error("Error al hacer login:", error)
    }
  }

  return (
    <>
      {
        user
          ? <div>
              <PictogramForm 
                createPictogram={createPictogram}
              />
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div>
                { loading ? <p>Cargando...</p> : null }
                <PictogramDisplay images={pictograms} />
                {/*{pictograms.map((pictogram) => (
                  <Pictogram key={pictogram.id} pictogram={pictogram} />
                ))}*/}
              </div>
            </div>
          : <LoginForm
              loginUser={loginUser}
            />
      }
    </>
  );
}

export default App;
