import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAATC5GXOjiZVXlqt7iKJ5GFtHCe4W4oYg",
  authDomain: "netflix-clone-f8c7a.firebaseapp.com",
  projectId: "netflix-clone-f8c7a",
  storageBucket: "netflix-clone-f8c7a.firebasestorage.app",
  messagingSenderId: "826707911282",
  appId: "1:826707911282:web:ed5bfd455f3c57c51fd8eb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  return signOut(auth);
};

export { auth, db, login, signup, logout };
