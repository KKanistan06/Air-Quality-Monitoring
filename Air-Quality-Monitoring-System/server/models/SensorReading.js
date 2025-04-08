import mongoose from "mongoose";

const SensorReadingSchema = new mongoose.Schema({
  place: String,
  date: {
    year: Number,
    month: Number,
    day: Number,
  },
  temperature: Number,
  co_gas: Number,
  humidity: Number,
  pm2_5: Number,
  pm10: Number,
});

export default mongoose.model("SensorReading", SensorReadingSchema);
