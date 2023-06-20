import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineClose } from 'react-icons/ai';
import { deleteDocumentById } from '../../server/query/query';
import './card.css';

export const Card = ({ data }) => {
  const [onPressable, setOnPressable] = useState(false);

  const handleCardClose = () => {
    setOnPressable(false);
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
              <AiOutlineDelete size={74} className="delete-icon" onClick={()=>deleteDocumentById(data.id)}/>
              <AiOutlineClose size={24} className="close-icon" onClick={handleCardClose} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
