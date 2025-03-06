import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";
import { Link } from "react-router-dom";
import landingImage from "./images/landing.webp"; 
import "./index.css";

const AirQualityDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const airQualityRef = ref(database, "air_quality/sensor1");
    onValue(airQualityRef, (snapshot) => {
      setData(snapshot.val() || {});
    });
  }, []);

  return (
    <div className="container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>Air Quality Dashboard</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>
      <div className="cont">
        {/* Hero Section with Note Above Image */}
        <div className="hero">
          <div className="hero-text">
            <h1>Welcome to the Air Quality Monitoring System</h1>
            <p>
              Monitor real-time air quality data to ensure a healthy
              environment.
            </p>
          </div>
          <img
            src={landingImage}
            alt="Air Quality Monitoring"
            className="hero-image"
          />
        </div>

        <h2 className="text-xl font-bold text-center mt-6">Air Quality Data</h2>

        {/* Grid Layout for Sensor Values */}
        <div className="grid-layout">
          {[
            { label: "CO GAS", value: data.co_gas },
            { label: "HUMIDITY", value: data.humidity },
            { label: "PM10", value: data.pm10 },
            { label: "PM2.5", value: data.pm2_5 },
            { label: "TEMPERATURE", value: data.temperature },
          ].map((item, idx) => (
            <div key={idx} className="card">
              <h2 className="font-semibold text-lg">{item.label}</h2>
              <p className="text-2xl font-bold">{item.value || "--"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirQualityDashboard;
