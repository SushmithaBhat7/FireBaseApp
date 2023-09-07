import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { FIREBASE_CONFIG } from "./firebase.config.local.js";

const app = initializeApp(FIREBASE_CONFIG);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

let userDetails = null;

export const validateUserDetails = () => {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      // window.location.href = "../loginScreen.html";
      return;
    }
    userDetails = user;
    renderUserDetails();
  });
};
export const renderUserDetails = () => {
  if (!userDetails) {
    return null;
  }

  const headerUserInfoElem = document.getElementById("user");
  const headerUserName = document.getElementById("userName");
  const headerUserPic = document.getElementById("userPic");

  headerUserName.innerText = userDetails.displayName;

  headerUserPic.src = userDetails.photoURL;
  headerUserPic.style.width = "60px";
  headerUserPic.style.height = "60px";
  headerUserPic.style.borderRadius = "50%";
  headerUserPic.style.objectFit = "cover";

  headerUserInfoElem.style.display = "flex";
  headerUserInfoElem.style.gap = "12px";
};
export const onLogOutUser = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      // window.location.href = "../loginScreen.html";
    })
    .catch((error) => {
      // An error happened.
      console.log({ error });
    });
};
