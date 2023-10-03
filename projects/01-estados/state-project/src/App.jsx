import { useState } from 'react'
import './App.css'

function App({contadorInicial}) {
  const [count, setCount] = useState(contadorInicial)

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <>
      <h1>Hola de prueba {count}</h1>
      <button onClick={handleClick}>
        aumentar
      </button>
    </>
  )
}

export default App
