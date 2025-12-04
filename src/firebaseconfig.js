import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTpbSMba414d3dqLx-ikYwFHMKiHlsO74",
  authDomain: "entertainment-web-app-51663.firebaseapp.com",
  projectId: "entertainment-web-app-51663",
  storageBucket: "entertainment-web-app-51663.firebasestorage.app",
  messagingSenderId: "79395440884",
  appId: "1:79395440884:web:61538cefdbb1c1cd0436a1"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
