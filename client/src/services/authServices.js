import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginService({ email, password }) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const response = await axios.post("/api/auth/login",{});
        return userCredentials.user;
    } catch (error) {
        throw new Error("Invalid Email or Password. Try Again");
    }
}

export async function signupService({ email, password }) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const response = await axios.post("/api/auth/signup",{})
        return userCredentials.user;
    } catch (error) {
        throw new Error("Failed to create account. Please try again.");
    }
}
