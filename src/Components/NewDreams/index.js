import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { handleSubmitNewDreams } from '../../server/query/query.js';

import './newDreams.css';

export const NewDreams = ({ closeModal }) => {
  const [dream, setDream] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const dreamData = {
      sonho: dream,
      descricao: description,
      foto: image,
      date: date
    };
    handleSubmitNewDreams(event, dreamData)
      .then((result) => {
        if (result.success) {
          closeModal()
        } else {
        }
      })
      .catch((error) => {
        console.error('Erro ao chamar a função handleSubmitNewDreams:', error);
      });
  };
  

  return (
    <div className="modal-content">
      <AiOutlineCloseCircle
        size={32}
        color="#E05151"
        onClick={closeModal}
        className="close-button"
      />
      <h2>Novo Sonho</h2>
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="dream">Sonho</label>
          <input
            type="text"
            id="dream"
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagem</label>
          <div className="view-img">
            <img src={image} className='view-img'/>
          </div>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" onClick={handleFormSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
};
