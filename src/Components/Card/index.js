import React from 'react';
import './card.css'

export const Card = ({ data }) => {
  return (
    <div className='container-dreams'>
        <div onClick={()=>alert(data.id)}>
            <img src={data.foto} alt={`Sonho ${data.sonho}`} className='image-dreams'/>
            <div className='info-dreams'>
                <h3>{data.sonho}</h3>
                <small>{data.data}</small>
            </div>
        </div>
    </div>
  );
}
