import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./PictogramList.css";
import Togglable from "../Togglable";
import EditPictogram from "./EditPictogram";

function PictogramList({ pictograms, updatePictogram }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPictogram, setSelectedPictogram] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const pictogramsPerPage = 5;

  const uniqueCategories = [
    ...new Set(pictograms.map((pictogram) => pictogram.category)),
  ];

  const filteredPictograms =
    selectedCategory === "todos"
      ? pictograms
      : pictograms.filter(
          (pictogram) => pictogram.category === selectedCategory
        );

  const indexOfLastPictogram = currentPage * pictogramsPerPage;
  const indexOfFirstPictogram = indexOfLastPictogram - pictogramsPerPage;
  const currentPictograms = filteredPictograms.slice(
    indexOfFirstPictogram,
    indexOfLastPictogram
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredPictograms.length / pictogramsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handleEditClick = (pictogram) => {
    setShowEditForm(true);
    setSelectedPictogram(pictogram);
  };

  return (
    <Togglable buttonLabel="Pictogram List">
      <>
        {!showEditForm && (
          <div>
            <span>Filter: </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="todos">Todos</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {!showEditForm && (
          <>
            <table className="pictogram-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPictograms.map((pictogram) => (
                  <tr key={pictogram.id}>
                    <td>{pictogram.name}</td>
                    <td>{pictogram.category}</td>
                    <td>
                      <button onClick={() => handleEditClick(pictogram)}>
                        <FaEdit /> Edit
                      </button>
                      <button>
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              {pageNumbers.map((number) => (
                <button key={number} onClick={() => setCurrentPage(number)}>
                  {number}
                </button>
              ))}
            </div>
          </>
        )}

        {showEditForm && selectedPictogram && (
          <EditPictogram
            pictogram={selectedPictogram}
            updatePictogram={updatePictogram}
          />
        )}
      </>
    </Togglable>
  );
}

export default PictogramList;
