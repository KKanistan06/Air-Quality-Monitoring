# 🌍 Air Quality Monitoring System 🌿  

## 📖 Table of Contents  
1. 🚀 [Project Overview](#project-overview)  
2. 🔬 [Features](#features)  
3. ⚙️ [Technology Stack](#technology-stack)  
4. 🏗️ [System Architecture](#system-architecture)  
5. 💾 [Installation & Setup](#installation--setup)  
6. 📊 [Usage](#usage)  
7. 📌 [Future Enhancements](#future-enhancements)  
8. 📜 [License](#license)  

---  

## 🚀 Project Overview  
The **Air Quality Monitoring System** is a smart solution for real-time environmental monitoring. It measures **CO₂, PM2.5, PM10.0, temperature, and humidity** and displays live data using a **React-based web application**. The system follows a **Master-Slave architecture**, where:  

- **Slave (Sensor Node)**: Collects air quality data from sensors.  
- **Master (Gateway Node)**: Receives data from multiple sensor nodes and pushes it to **Firebase**.  

---  

## 🔬 Features  
✅ Real-time air quality monitoring  
✅ Graphical representation of sensor data  
✅ Master-Slave architecture (Gateway + Sensor Nodes)  
✅ Firebase as backend for data storage  
✅ Responsive React-based web interface  

---  

## ⚙️ Technology Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Firebase (Realtime Database / Firestore)  
- **Hardware**:  
  - **Master (Gateway Node)**: ESP8266 / ESP32  
  - **Slaves (Sensor Nodes)**: Air Quality Sensors (CO₂, PM2.5, PM10.0, DHT11/DHT22 for temperature & humidity)  
- **Communication Protocol**: MQTT / HTTP Requests  

---  

## 🏗️ System Architecture  
📡 **Sensor Nodes (Slaves)** → 🔗 **Gateway (Master)** → 🔥 **Firebase** → 💻 **React Web App**  

- **Sensor Nodes** collect data and send it to the **Gateway Node**.  
- **Gateway Node** pushes data to **Firebase**.  
- **React App** fetches and displays real-time air quality data.  

---  

## 💾 Installation & Setup  

### 📍 Setting Up the React App  
1. Clone the repository:  
   ```bash
   git clone https://github.com/KKanistan06/Air-Quality-Monitoring.git
   ```  
2. Install dependencies:  
   ```bash
   cd air-quality-monitor
   npm install
   ```  
3. Start the React application:  
   ```bash
   npm start
   ```  
4. Access the web app at:  
   ```
   http://localhost:3000
   ```  

### 📍 Setting Up Firebase  
1. Create a **Firebase project** at [Firebase Console](https://console.firebase.google.com/).  
2. Set up **Realtime Database** or **Firestore**.  
3. Configure Firebase in the React app:  
   - Add Firebase SDK to your project.  
   - Update Firebase config in your app.  

---  

## 📊 Usage  
1. Deploy sensor nodes and connect them to the gateway.  
2. The gateway collects sensor data and uploads it to Firebase.  
3. Open the React app to visualize real-time air quality readings.  

---  

## 📌 Future Enhancements  
- Historical data analysis & trend visualization  
- Machine learning-based air quality predictions  
- Mobile app version  
- Air quality alerts & notifications  

---  

## 📜 License  
📖 This project is open-source and licensed under the **MIT License**.  
