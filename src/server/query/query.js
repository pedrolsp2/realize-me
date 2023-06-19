import firebase from '../firebase/firebaseconfig'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const db = firebase.firestore();
const colecaoSonhos = db.collection('sonhos');

export const handleSubmitNewDreams = (event, dreamData) => {
  return new Promise((resolve, reject) => {
    event.preventDefault();
    colecaoSonhos
      .add({
        sonho: dreamData.sonho,
        descricao: dreamData.descricao,
        foto: dreamData.foto,
        data: dreamData.date,
      })
      .then(() => {
        resolve({
           success: true,
           message: (
            toast.success("Sonho cadastrado com sucesso!", {
            position: toast.POSITION.TOP_CENTER
          })
        ) });
      })
      .catch((error) => {
        reject({
           success: false,
           message: (
            toast.error("Erro ao cadastrar", {
              position: toast.POSITION.TOP_LEFT
            })
           ) });
      });
  });
};

export const fetchAllDreams = () => {
  return colecaoSonhos
    .get()
    .then((querySnapshot) => {
      const dreams = [];
      querySnapshot.forEach((doc) => {
        const dream = {
          id: doc.id,
          ...doc.data()
        };
        dreams.push(dream);
      });
      return dreams;
    })
    .catch((error) => {
      console.error('Erro ao buscar os sonhos:', error);
      return [];
    });
};

