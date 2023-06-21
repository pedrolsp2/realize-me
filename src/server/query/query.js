import firebase from '../firebase/firebaseconfig'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";

const db = firebase.firestore();
const storage = firebase.storage();
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

export const handleNewFile = async (image) => {
  const storageRef = storage.ref('img-sonhos');
  const imageName = `${uuidv4()}-${image.name}`;
  const imageRef = storageRef.child(imageName);
  await imageRef.put(image);
  
  const imageUrl = await imageRef.getDownloadURL();

  return imageUrl;
};

export const deleteDocumentById = async (documentId) => {
  try {
    const collectionRef = firebase.firestore().collection('sonhos');
    const documentRef = collectionRef.doc(documentId);

    await documentRef.delete();
    toast.success("Sucesso ao excluir!", {
      position: toast.POSITION.TOP_LEFT
    })
  } catch (error) {
    toast.error("Erro ao excluir", {
      position: toast.POSITION.TOP_LEFT
    })
  }
};

export const handleEditDocumentById = async (documentId, dreamData) => {
  try {
    const collectionRef = firebase.firestore().collection('sonhos');
    const documentRef = collectionRef.doc(documentId);

    await documentRef.update({
      sonho: dreamData.sonho,
      descricao: dreamData.descricao,
      foto: dreamData.foto,
      data: dreamData.data,
    });

    toast.success("Sucesso ao editar!", {
      position: toast.POSITION.TOP_LEFT
    });
  } catch (error) {
    console.log(error)
    console.log(error)
    toast.error(`Erro ao editar`, {
      position: toast.POSITION.TOP_LEFT
    });
  }
};
