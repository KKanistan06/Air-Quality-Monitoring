import mongoose from "mongoose";

const AirQualitySchema = new mongoose.Schema({
  co_gas: Number,
  humidity: Number,
  pm10: Number,
  pm2_5: Number,
  temperature: Number,
  date: { type: Date, default: Date.now },
});

export default mongoose.model("AirQuality", AirQualitySchema);
