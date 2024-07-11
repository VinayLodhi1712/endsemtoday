// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState, useEffect, useContext, createContext } from "react";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcUzKbejhwRttks07y69keymulJ3i71UU",
  authDomain: "talkofcode.firebaseapp.com",
  projectId: "talkofcode",
  storageBucket: "talkofcode.appspot.com",
  messagingSenderId: "961878030831",
  appId: "1:961878030831:web:b6fd0941465ef309539e1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const AuthContext = createContext();

const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

const logout = () => {
  return signOut(auth);
};

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");

    if (data) {
      const parsedData = JSON.parse(data);
      setAuthState({
        ...authState,
        user: parsedData.user,
        token: parsedData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, loginWithGoogle, logout };
