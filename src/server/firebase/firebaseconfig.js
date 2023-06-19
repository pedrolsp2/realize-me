import firebase from "firebase/compat/app"
import "firebase/compat/firestore"  

const firebaseConfig = {
    apiKey: "AIzaSyCHYflN0zFRcnkRnkUBbnrLFtkJnEB97ys",
    authDomain: "realizeme-a65cf.firebaseapp.com",
    projectId: "realizeme-a65cf",
    storageBucket: "realizeme-a65cf.appspot.com",
    messagingSenderId: "388593315580",
    appId: "1:388593315580:web:b6b2a76ff16605b8327179",
    measurementId: "G-XHM1DBB4GQ"
};

if(!firebase.apps.length){
    console.log("Conectando...")
    firebase.initializeApp(firebaseConfig)
    console.log("Conectador")
}
 
export default firebase;