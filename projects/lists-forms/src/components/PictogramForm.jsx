// PictogramForm.jsx

import React, { useState } from 'react';
import Togglable from './Togglable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PictogramForm({ createPictogram }) {
  const [nameValue, setNameValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [urlValue, setUrlValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pictogramObject = {
      name: nameValue,
      category: categoryValue,
      url: urlValue,
    };

    try {
      await createPictogram(pictogramObject);
      // Notificación de éxito
      toast.success('Pictogram created successfully', {
        position: 'top-right',
        autoClose: 3000,
      });
      setNameValue('');
      setCategoryValue('');
      setUrlValue('');
    } catch (error) {
      // Notificación de error
      console.error('Error creating pictogram:', error);
      toast.error('There was an error creating the pictogram. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <Togglable buttonLabel="New pictogram">
      <div>
        <h3>Create a new pictogram</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
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
      </div>
      <ToastContainer />
    </Togglable>
  );
}
