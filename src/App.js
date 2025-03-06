import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AirQualityDashboard from "./AirQualityDashboard";
import AboutUs from "./AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AirQualityDashboard />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
