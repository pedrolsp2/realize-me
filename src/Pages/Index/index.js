import React, { useState, useEffect } from 'react';
import './index.css';
import { Card } from '../../Components/Card';
import { NewDreams } from '../../Components/NewDreams';
import { IoAddCircleOutline } from 'react-icons/io5';
import Persona from '../../assets/persona.svg';
import Modal from 'react-modal';
import { fetchAllDreams } from '../../server/query/query';

const Index = () => {
  const [data, setData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const fetchData = async() => {
    try {
      const dreamsData = await fetchAllDreams();
      setData(dreamsData);
    } catch (error) {
      console.error('Erro ao resgatar os sonhos:', error);
    }
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
    <div className='container'>
      <main>
        <div className='row'>
          <div className='card welcome'>
            <img src={Persona} alt='Uusario' />
            <div className='msg'>
              <h1>Olá! Como está seus sonhos?</h1>
              <p>
                Veja abaixo um histórico do quadro dos sonhos... E, ah! Caso haja mais, coloque aqui!
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='card dreams'>
            {data.map((item, index) => (
              <Card key={index} data={item} className='card' />
            ))}
          </div>
          <div className='card painting-dreams'>
            <span>
              <small onClick={openModal}>Clique aqui para adicionar mais sonhos!</small>
              <IoAddCircleOutline size={32} color='#62C46B' />
            </span>
          </div>
        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={modalStyles}>
        <NewDreams closeModal={() => setModalIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default Index;
