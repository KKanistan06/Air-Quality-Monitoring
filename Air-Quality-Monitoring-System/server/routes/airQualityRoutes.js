import express from "express";
import {
  getLatestData,
  getHistoricalData,
} from "../controllers/airQualityController.js";

const router = express.Router();

router.get("/latest", getLatestData);
router.get("/history", getHistoricalData);

export default router;
