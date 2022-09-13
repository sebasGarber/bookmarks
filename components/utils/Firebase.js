// Your web app's Firebase configuration
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

//Introducing Firebase v9.x Web SDK
//https://blog.logrocket.com/refactor-react-app-firebase-v9-web-sdk/

const firebaseConfig = {
  apiKey: "AIzaSyB6ARljSQJeAaALyeXMxTw2tYG0oAIoeew",
  authDomain: "bookmarks-6bd1e.firebaseapp.com",
  projectId: "bookmarks-6bd1e",
  storageBucket: "bookmarks-6bd1e.appspot.com",
  messagingSenderId: "1001759651420",
  appId: "1:1001759651420:web:58d331f990177c35ec1899"
};

export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth(firebaseApp)

//https://firebase.google.com/docs/web/modular-upgrade
export const db = getFirestore(firebaseApp);


export const reauthenticate = (password) => {

  const user = auth.currentUser;

  return signInWithEmailAndPassword(auth, user.email, password);


}


