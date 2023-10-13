import React, { useState } from "react";
import Togglable from "./Togglable";

export default function NoteForm({ createPictogram }) {
  
  const [nameValue, setNameValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const pictogramObject = {
      name: nameValue,
      category: categoryValue,
      url: urlValue,
    };

    createPictogram(pictogramObject);
    setNameValue("");
    setCategoryValue("");
    setUrlValue("");
  }
  
  return (
      <Togglable buttonLabel="New pictogram">
        <h3>Create a new pictogram</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="name"
            value={nameValue} 
            onChange={(e) => setNameValue(e.target.value)}
            />
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
          <button>Create</button>
        </form>
    </Togglable>
  )
}