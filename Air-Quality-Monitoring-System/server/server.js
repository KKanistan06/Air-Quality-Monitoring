import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import airQualityRoutes from "./routes/airQualityRoutes.js";
import mqttService from "./services/mqttService.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/air_quality", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

// Routes
app.use("/api/sensors", airQualityRoutes);

// Initialize MQTT service
mqttService.initialize();

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
