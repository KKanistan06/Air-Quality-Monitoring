import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import landingImage from "./images/landing.webp";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./index.css";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

const AirQualityDashboard = () => {
  // Initialize with null values instead of empty object
  const [data, setData] = useState({
    co_gas: null,
    humidity: null,
    pm10: null,
    pm2_5: null,
    temperature: null,
  });
  const [historyData, setHistoryData] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [filters, setFilters] = useState({ place: "", date: "" });
  const [filteredData, setFilteredData] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // replace this with your real API key
  });

  // Fetch latest sensor data every 3 seconds
  useEffect(() => {
    const fetchLatestData = async () => {
      try {
        console.log("Fetching latest data...");
        const response = await fetch(
          "http://localhost:5000/api/sensors/latest"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Latest data received:", json);

        // Update state with latest data - ensure proper parsing of all values
        setData({
          co_gas: json.co_gas !== undefined ? parseFloat(json.co_gas) : null,
          humidity:
            json.humidity !== undefined ? parseFloat(json.humidity) : null,
          pm10: json.pm10 !== undefined ? parseFloat(json.pm10) : null,
          pm2_5: json.pm2_5 !== undefined ? parseFloat(json.pm2_5) : null,
          temperature:
            json.temperature !== undefined
              ? parseFloat(json.temperature)
              : null,
        });
      } catch (err) {
        console.error("Error fetching latest sensor data:", err);
      }
    };

    fetchLatestData();
    const intervalId = setInterval(fetchLatestData, 3000);

    return () => clearInterval(intervalId);
  }, []);

  // Fetch historical data
  useEffect(() => {
    fetch("http://localhost:5000/api/sensors/history")
      .then((res) => res.json())
      .then((json) => {
        const formatted = json.map((item) => ({
          ...item,
          date:
            item.date && item.date.year && item.date.month && item.date.day
              ? `${item.date.year}/${String(item.date.month).padStart(
                  2,
                  "0"
                )}/${String(item.date.day).padStart(2, "0")}`
              : "Date unavailable",
        }));
        setHistoryData(formatted);
        setFilteredData(formatted);
      })
      .catch((err) => console.error("Error fetching history data:", err));
  }, []);

  // Filter logic
  useEffect(() => {
    const filtered = historyData.filter((item) => {
      const matchesPlace = filters.place
        ? item.place.toLowerCase().includes(filters.place.toLowerCase())
        : true;
      const matchesDate = filters.date
        ? item.date.includes(filters.date)
        : true;
      return matchesPlace && matchesDate;
    });
    setFilteredData(filtered);
  }, [filters, historyData]);

  // Helper function to format values properly
  const formatValue = (value) => {
    if (value === null || value === undefined) return "--";
    if (typeof value === "number" && !Number.isInteger(value)) {
      return value.toFixed(2);
    }
    return value.toString();
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="conth2">Air Quality Dashboard</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="cont">
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

        {/* Real-time Grid */}
        <div className="grid-layout">
          <div className="card">
            <h2 className="font-semibold text-lg">CO GAS</h2>
            <p className="text-2xl font-bold">{formatValue(data.co_gas)}</p>
          </div>
          <div className="card">
            <h2 className="font-semibold text-lg">HUMIDITY</h2>
            <p className="text-2xl font-bold">{formatValue(data.humidity)}</p>
          </div>
          <div className="card">
            <h2 className="font-semibold text-lg">PM10</h2>
            <p className="text-2xl font-bold">{formatValue(data.pm10)}</p>
          </div>
          <div className="card">
            <h2 className="font-semibold text-lg">PM2.5</h2>
            <p className="text-2xl font-bold">{formatValue(data.pm2_5)}</p>
          </div>
          <div className="card">
            <h2 className="font-semibold text-lg">TEMPERATURE</h2>
            <p className="text-2xl font-bold">
              {formatValue(data.temperature)}
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-center mb-2">
            Sensor Locations
          </h2>
          {loadError && <p>Error loading map</p>}
          {!isLoaded ? (
            <p>Loading Map...</p>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={7}
              center={center}
            >
              <Marker
                position={center}
                title={`Sensor Node\nCO: ${formatValue(data.co_gas)}`}
              />
            </GoogleMap>
          )}
        </div>

        {/* Toggle Historical Data */}
        <div className="text-center mt-6">
          <button
            className="toggle-button"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? "Hide Data Analysis" : "View Data Analysis"}
          </button>
        </div>

        {/* Historical Data Section */}
        {showHistory && (
          <>
            <h2 className="text-xl font-bold text-center mt-10 mb-4">
              Historical Monthly Data
            </h2>

            {/* Filters */}
            <div className="filters">
              <input
                type="text"
                placeholder="Filter by Place"
                value={filters.place}
                onChange={(e) =>
                  setFilters({ ...filters, place: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Filter by Date (yyyy/mm/dd)"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>

            {/* Table */}
            <div className="table-container mt-6">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Place</th>
                    <th>Temperature</th>
                    <th>CO Gas</th>
                    <th>Humidity</th>
                    <th>PM2.5</th>
                    <th>PM10</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        {item.formattedDate ||
                          (item.date && typeof item.date === "string"
                            ? item.date
                            : new Date().toLocaleDateString())}
                      </td>
                      <td>{item.place}</td>
                      <td>{formatValue(item.temperature)}</td>
                      <td>{formatValue(item.co_gas)}</td>
                      <td>{formatValue(item.humidity)}</td>
                      <td>{formatValue(item.pm2_5)}</td>
                      <td>{formatValue(item.pm10)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Chart */}
            <div className="chart-container mt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="co_gas"
                    stroke="#82ca9d"
                    name="CO Gas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Air Quality Monitoring System. Developed by K. Kanistan</p>
      </footer>
    </div>
  );
};

export default AirQualityDashboard;
