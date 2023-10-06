import "./App.css";
import { useState, useEffect } from "react";
import { Pictogram } from "./components/Pictogram";
import { getAllPictograms } from "./services/notes/getAllPictograms.js";
import { createPictogram } from "./services/notes/createPictogram.js";

function App() {
  const [pictograms, setPictograms] = useState([]);
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [urlValue, setUrlValue] = useState("");
  const [loading, setLoading] = useState();

  useEffect(() => {
    console.log("useEffect");
    setLoading(true);
    //Uso del servicio
    getAllPictograms().then((response) => {
      setPictograms(response);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    const pictogramToAdd = {
      name: nameValue,
      category: categoryValue, // Utiliza el valor de category
      url: urlValue, // Utiliza el valor de url
    };

    createPictogram(pictogramToAdd)
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

  console.log("render");
  return (
    <div className="main">
      <h1>Pictogramas</h1>
      {loading ? <p>Cargando...</p> : null}{" "}
      {/*Si loading es true, muestra el mensaje*/}
      {pictograms.map((pictogram) => (
        <Pictogram key={pictogram.id} pictogram={pictogram} />
      ))}
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default App;
