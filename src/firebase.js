import { initializeApp } from "firebase/app";
import {
     createUserWithEmailAndPassword,
     getAuth, 
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import {
    addDoc,
     collection,
      getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAAk9fwKkR9W8gfT3TeDFBTeoE35-PVy28",
  authDomain: "netflix-clone-b6856.firebaseapp.com",
  projectId: "netflix-clone-b6856",
  storageBucket: "netflix-clone-b6856.firebasestorage.app",
  messagingSenderId: "33927958431",
  appId: "1:33927958431:web:520eec245fcf47709837aa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try {
     const response =  await createUserWithEmailAndPassword(auth,email,password);
     const user = response.user;
     await addDoc(collection(db,'user'),{
        uid:user.uid,
        name,
        authProvider:"local",
        email,
     })
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))  
    }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))  
    }
}

const logout = async ()=>{
        signOut(auth)
    
}

export {auth,db,login,signup,logout}