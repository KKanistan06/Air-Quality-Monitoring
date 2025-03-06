import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC0b7UWfbPACt6dRxMPE4gE2ufmWiZVUTs",
  authDomain: "air-quality-management-acd8b.firebaseapp.com",
  databaseURL:
    "https://air-quality-management-acd8b-default-rtdb.firebaseio.com",
  projectId: "air-quality-management-acd8b",
  storageBucket: "air-quality-management-acd8b.firebasestorage.app",
  messagingSenderId: "861358368601",
  appId: "1:861358368601:web:692174a3e4261282330e48",
  measurementId: "G-HHSBHDXXP8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to generate random sensor data
const generateRandomData = () => ({
  temperature: (Math.random() * (40 - 20) + 20).toFixed(1), // 20°C - 40°C
  co_gas: (Math.random() * (1.0 - 0.1) + 0.1).toFixed(2), // 0.1 - 1.0 ppm
  humidity: Math.floor(Math.random() * (80 - 40) + 40), // 40% - 80%
  pm2_5: Math.floor(Math.random() * (100 - 10) + 10), // 10 - 100 µg/m³
  pm10: Math.floor(Math.random() * (150 - 20) + 20), // 20 - 150 µg/m³
});

// Function to send data to Firebase
const sendDataToFirebase = () => {
  const sensorRef = ref(database, "air_quality/sensor1");
  const newData = generateRandomData();

  set(sensorRef, newData)
    .then(() => console.log("Data sent to Firebase:", newData))
    .catch((error) => console.error("Error sending data:", error));
};

// Send data every 5 seconds
setInterval(sendDataToFirebase, 5000);
