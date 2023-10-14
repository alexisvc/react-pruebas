import React, { useState, useEffect } from "react";
import GameHeader from "./GameHeader";
import PictogramQuestion from "./PictogramQuestion";
import PictogramOptions from "./PictogramOptions";
import confetti from "canvas-confetti";

import "./RecognitionGame.css";
import Togglable from "../Togglable";


function RecognitionGame({ pictograms }) {
  const [currentPictograms, setCurrentPictograms] = useState([]);
  const [currentPictogram, setCurrentPictogram] = useState(null);

  const [difficulty, setDifficulty] = useState("Fácil");
  const [synthesis, setSynthesis] = useState(null);
  const [lives, setLives] = useState(5);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState(0);

  useEffect(() => {
    getRandomPictograms(difficulty);
    // Inicializa la síntesis de voz
    const synthesis = window.speechSynthesis;
    setSynthesis(synthesis);
  }, [difficulty]);

  const getRandomPictograms = (selectedDifficulty) => {
    let numberOfPictograms = 3;
  
    if (selectedDifficulty === "Normal") {
      numberOfPictograms = 5;
    } else if (selectedDifficulty === "Difícil") {
      numberOfPictograms = 7;
    }
  
    const shuffledPictograms = shuffleArray(pictograms).slice(0, numberOfPictograms);
    setCurrentPictograms(shuffledPictograms);
    getRandomPictogram(shuffledPictograms);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const getRandomPictogram = (pictograms) => {
    if (pictograms.length > 0) {
      const randomIndex = Math.floor(Math.random() * pictograms.length);
      const randomPictogram = pictograms[randomIndex];
      setCurrentPictogram(randomPictogram);
    } else {
      setCurrentPictogram(null);
    }
  };

  const handleMouseOver = (textToSpeak) => {
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.5;
      synthesis.speak(utterance);
    }
  };

  const checkAnswer = (imageName) => {
    if (currentPictogram && currentPictogram.name === imageName) {
      confetti(); // Dispara los confettis
      alert("¡Muy bien!");
      // Aumentar los puntos en 1
      setPoints(points + 1);
      // Elimina el pictograma correcto de la lista
      const updatedPictograms = currentPictograms.filter(pictogram => pictogram.name !== imageName);
      setCurrentPictograms(updatedPictograms);

      if (updatedPictograms.length > 0) {
        // Si quedan pictogramas, selecciona uno nuevo
        getRandomPictogram(updatedPictograms);
      } else {
        // Si no quedan pictogramas, has completado el juego
        alert("¡Has completado el juego!");
        // Aumentar las insignias al completar el juego
        setBadges(badges + 1);
        setDifficulty("Fácil"); // Reinicia el juego con la dificultad "Fácil" (puedes ajustar esto)
        getRandomPictograms("Fácil");
      }
    } else {
      alert("Incorrecto. Intenta de nuevo.");
      // Disminuir una vida
      setLives(lives - 1);
      // Comprobar si se han agotado todas las vidas
      if (lives - 1 === 0) {
        alert("¡Has perdido todas tus vidas!");
        setDifficulty("Fácil"); // Reinicia el juego con la dificultad "Fácil" (puedes ajustar esto)
        getRandomPictograms("Fácil");
        setBadges(0); // Reinicia las insignias al perder el juego
        setPoints(0); // Reinicia los puntos al perder el juego
        setLives(5); // Reinicia las vidas al perder el juego
      }
    }
  };

  return (
    <Togglable buttonLabel="Juego de Reconocimiento">
      <div className="App">
        <h1 className="game-title">Juego de Reconocimiento</h1>

        {/* Selección de dificultad */}
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Dificultad:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <GameHeader lives={lives} points={points} badges={badges} />
        <PictogramQuestion
          currentPictogram={currentPictogram}
          handleMouseOver={handleMouseOver}
          checkAnswer={checkAnswer}
        />
        <PictogramOptions
          currentPictograms={currentPictograms}
          handleMouseOver={handleMouseOver}
          checkAnswer={checkAnswer}
        />
      </div>
    </Togglable>
  );
}

export default RecognitionGame;