import React, { useState, useRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { handleSubmitNewDreams, handleNewFile } from '../../server/query/query.js';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './newDreams.css';

export const NewDreams = ({ closeModal, updateData }) => {
  const [dream, setDream] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState(''); 
  const fileInputRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const imageUrl = await handleNewFile(image);
      console.log(imageUrl);
      const dreamData = {
        sonho: dream,
        descricao: description,
        foto: imageUrl,
        date: date,
      };
      const progress = toast.info('Enviando sonho...', {
        position: toast.POSITION.TOP_LEFT,
        autoClose: false,
        hideProgressBar: false,
      });

      handleSubmitNewDreams(event, dreamData)
        .then((result) => {
          if (result.success) {
            toast.dismiss(progress);
            closeModal();
            updateData(); // Chama a função de atualização dos dados no componente pai
          } else {
            toast.dismiss(progress);
          }
        })
        .catch((error) => {
          toast.dismiss(progress);
          console.error('Erro ao chamar a função handleSubmitNewDreams:', error);
        });
    } catch (error) {
      console.error('Erro ao fazer o upload da imagem:', error);
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="modal-content">
      <AiOutlineCloseCircle
        size={32}
        color="#E05151"
        onClick={closeModal}
        className="close-button"
      />
      <div className="form-container">
        <form className="form">
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
          <div className="form-group">
            <label htmlFor="image">Imagem</label>
            <div className="image-preview">
              {previewImage && <img src={previewImage} alt={`Imagem do sonho ${dream}`} />}
              <input
                type="file"
                id="file-upload"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg, image/png"
                style={{ display: 'none' }}
              />
              <button type="button" className="upload-button" onClick={handleButtonClick}>
                Selecionar Arquivo
              </button>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" onClick={handleFormSubmit}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
