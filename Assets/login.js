import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { FIREBASE_CONFIG } from "./firebase.config.local.js";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const onLogin = () => {
  signInWithRedirect(auth, provider);
};
getRedirectResult(auth)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log({ user });
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error);
  });
export const onAlreadyLogin = () => {
  auth.onAuthStateChanged((user) => {
    console.log("user: ", user);
    if (!user) {
      return;
    }
    //If user is found redirect to Homepage
    window.location.href = "../index.html";
  });
};
