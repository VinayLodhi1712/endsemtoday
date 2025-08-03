import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcUzKbejhwRttks07y69keymulJ3i71UU",
  authDomain: "talkofcode.firebaseapp.com",
  projectId: "talkofcode",
  storageBucket: "talkofcode.appspot.com",
  messagingSenderId: "961878030831",
  appId: "1:961878030831:web:b6fd0941465ef309539e1a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };         // <-- named export
export default app;      // <-- default export