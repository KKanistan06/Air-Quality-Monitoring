const express = require("express");
const router = express.Router();
const SensorReading = require("../models/SensorReading");

// Get latest reading
router.get("/latest", async (req, res) => {
  const latest = await SensorReading.findOne().sort({ _id: -1 });
  res.json(latest);
});

// Get all history
router.get("/history", async (req, res) => {
  const allData = await SensorReading.find().sort({
    "date.year": 1,
    "date.month": 1,
    "date.day": 1,
  });
  res.json(allData);
});

module.exports = router;
