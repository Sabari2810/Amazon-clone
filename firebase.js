import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA-UIaIWuXWj6M74sTfhRRb3Ntfnzk4y0c",
  authDomain: "clone-2021-84a22.firebaseapp.com",
  projectId: "clone-2021-84a22",
  storageBucket: "clone-2021-84a22.appspot.com",
  messagingSenderId: "734916478496",
  appId: "1:734916478496:web:349706746c32f51c655e45",
};

const app = getApps().length != 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
