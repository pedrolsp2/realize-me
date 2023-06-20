import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { deleteDocumentById } from '../../server/query/query';
import Modal from 'react-modal';
import { NewDreams } from '../NewDreams';
import './card.css';

export const Card = ({ data, updateData}) => {
  const [onPressable, setOnPressable] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCardClose = () => {
    setOnPressable(false);
  };

  const handleTrash = (id) =>{
    deleteDocumentById(id)
    updateData()
  }

  const closeModal = () => {
    setModalIsOpen(false); 
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      backgroundColor: 'transparent',
      border: 'none',
      padding: 0,
    },
  };

  return (
    <>
      <div className={`container-dreams ${onPressable ? 'pressed' : ''}`}>
        <img
          src={data.foto}
          alt={`Sonho ${data.sonho}`}
          className={`image-dreams ${onPressable ? 'blurred' : ''}`}
          onClick={() => setOnPressable(true)}
        />
        <div className={`info-dreams ${onPressable ? 'blurred' : ''}`}>
          <h3>{data.sonho}</h3>
          <small>{data.data}</small>
        </div>
        {onPressable && (
          <div className="overlay">
            <div className="icon-container">
              <AiOutlineDelete size={74} className="delete-icon" onClick={()=>handleTrash(data.id)}/>
              <AiOutlineClose size={24} className="close-icon" onClick={handleCardClose} />
              <AiOutlineEdit size={24} className="edit-icon" onClick={openModal}/>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <NewDreams closeModal={closeModal} pDream={data.sonho} pDescription={data.descricao} pImage={data.foto} pDate={data.data} actionFrom={"edit"} dataId={data.id}/>
      </Modal>
    </>
  );
};
