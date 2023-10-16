import { useState, useEffect } from "react";
import pictogramServices from "../services/pictograms";

export function usePictograms(user) {
  const [pictograms, setPictograms] = useState([]);

  // Traer pictogramas del usuario
  useEffect(() => {
    if (user) {
      pictogramServices.getPictogramsByUserId(user.id).then((response) => {
        setPictograms(response);
      });
    }
  }, [user]);

  // Crear pictograma
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

  return {
    pictograms,
    createPictogram,
  };
}
