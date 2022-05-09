import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCxz4WBXqpqLp_SaBz9VErVWsapB4_gmZU",
  authDomain: "vmo-cinema.firebaseapp.com",
  projectId: "vmo-cinema",
  storageBucket: "vmo-cinema.appspot.com",
  messagingSenderId: "140400883885",
  appId: "1:140400883885:web:eafbf4125e1e4537bdee24",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const getInformation = async () => {
  try {
    const info = await signInWithPopup(auth, provider);
    if (info) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          userName: info.user.displayName,
          email: info.user.email,
          picture: info.user.photoURL,
        })
      );
      // localStorage.setItem("user", JSON.stringify(info.user.email));
      // localStorage.setItem("user", JSON.stringify(info.user.photoURL));
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default getInformation;
