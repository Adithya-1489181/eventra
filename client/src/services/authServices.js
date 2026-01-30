import axios from "axios"
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginService({email,password}) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth,email,password);
        //const response = await axios.post("/api/auth/login",{})
        return userCredentials.data;
    } catch (error) {
        throw new Error("Invalid Email or Password. Try Again");
    }
}