import "./App.css";
import { useState, useEffect } from "react";
import { Pictogram } from "./components/Pictogram";

import pictogramServices from "./services/pictograms";
import loginServices from "./services/login";

function App() {
  const [pictograms, setPictograms] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
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

  const handleChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const pictogramToAdd = {
      name: nameValue,
      category: categoryValue, // Utiliza el valor de category
      url: urlValue, // Utiliza el valor de url
    };
    // Llamada al servicio para crear el pictograma
    pictogramServices.createPictogram(pictogramToAdd)
      .then((newPictogram) => {
        setPictograms((prevPictograms) => [...prevPictograms, newPictogram]);
        setNameValue("");
        setCategoryValue(""); // Limpia el valor del campo de categoría
        setUrlValue(""); // Limpia el valor del campo de URL
      })
      .catch((error) => {
        console.error("Error al crear el pictograma:", error);
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
      });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login", username, password)

    try {
      const user = await loginServices.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      console.log("User", user)
    } catch (error) {
      console.error("Error al hacer login:", error)
    }

  }

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          placeholder="username"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          Login
        </button>
      </form>

      <h1>Formulario</h1>
      <form onSubmit={handleCreateSubmit}>
        <input type="text" placeholder="name" onChange={handleChange} value={nameValue} />
        <br />
        <input
          type="text"
          placeholder="Category"
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="URL"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
        />
        <br />
        <button>Crear pictograma</button>
      </form>

      <h1>Pictogramas</h1>
      {loading ? <p>Cargando...</p> : null}{" "}
      {/*Si loading es true, muestra el mensaje*/}
      {pictograms.map((pictogram) => (
        <Pictogram key={pictogram.id} pictogram={pictogram} />
      ))}
    </div>
  );
}

export default App;
