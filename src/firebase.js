import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC0b7UWfbPACt6dRxMPE4gE2ufmWiZVUTs",
  authDomain: "air-quality-management-acd8b.firebaseapp.com",
  databaseURL:
    "https://air-quality-management-acd8b-default-rtdb.firebaseio.com",
  projectId: "air-quality-management-acd8b",
  storageBucket: "air-quality-management-acd8b.appspot.com",
  messagingSenderId: "861358368601",
  appId: "1:861358368601:web:692174a3e4261282330e48",
  measurementId: "G-HHSBHDXXP8",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
