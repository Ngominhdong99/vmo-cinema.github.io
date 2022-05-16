import firebase from "firebase/compat/app";
import "firebase/compat/analytics";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxz4WBXqpqLp_SaBz9VErVWsapB4_gmZU",
  authDomain: "vmo-cinema.firebaseapp.com",
  projectId: "vmo-cinema",
  storageBucket: "vmo-cinema.appspot.com",
  messagingSenderId: "140400883885",
  appId: "1:140400883885:web:eafbf4125e1e4537bdee24",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };

export default firebase;
