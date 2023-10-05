import './App.css'
import { useState, useEffect } from 'react'
import {Pictogram} from './components/Pictogram'
import { getAllNotes } from './services/notes/getAllNotes.js'
import { createNote } from './services/notes/createNote.js'


function App() {
  const [pictograms, setPictograms] = useState([])
  const [newPictogram, setNewPictogram] = useState('')
  const [loading, setLoading] = useState()

  useEffect(() => {
    console.log('useEffect')
    setLoading(true)
    //Uso del servicio
    getAllNotes().then(response => {
        setPictograms(response)
        setLoading(false)
      });
  }, []);
  

  const handleChange = (e) => { 
    setNewPictogram(e.target.value)
  }

  const handleSubmit = (e) => { 
    e.preventDefault(); //Sirve para no recargar la página
    const pictogramToAdd = {
      "title": newPictogram,
      "body": newPictogram,
      "userId": 1,
    }
    //Uso del servicio
    createNote(pictogramToAdd)
      .then((newPictogram) => {
        setPictograms((prevPictograms) => prevPictograms.concat(newPictogram));
      });
      setNewPictogram("");
  }

  console.log('render')
  return (
    <div className='main'>
      <h1>Pictogramas</h1>
      {loading ? <p>Cargando...</p> : null} {/*Si loading es true, muestra el mensaje*/}  
      {pictograms.map((pictogram) => (
        <Pictogram 
          key={pictogram.id}
          pictogram={pictogram} />
      ))}
    
    <h1>Formulario</h1>
    <form onSubmit={handleSubmit}>
      <input type='text'onChange={handleChange} value={newPictogram}/><br/>
      <button>Crear pictograma</button>
    </form>

  </div>
  );
}

export default App
