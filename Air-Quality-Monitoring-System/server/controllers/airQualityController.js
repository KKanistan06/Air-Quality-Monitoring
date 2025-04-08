import SensorReading from "../models/SensorReading.js";

// Get the latest sensor data
export const getLatestData = async (req, res) => {
  try {
    // Fetch the newest document
    const latestData = await SensorReading.findOne().sort({ _id: -1 });

    // If no data exists, return defaults
    if (!latestData) {
      return res.json({
        co_gas: 0,
        temperature: 0,
        humidity: 0,
        pm2_5: 0,
        pm10: 0,
        place: "Unknown",
        date: "Date unavailable",
      });
    }

    // If date is an object {year,month,day}, format it.
    // Otherwise, if it's a JS Date, also format it.
    // If none, return "Date unavailable".
    let formattedDate = "Date unavailable";

    if (latestData.date instanceof Date) {
      // If older documents store a JS Date
      const d = latestData.date;
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      formattedDate = `${year}/${month}/${day}`;
    } else if (
      latestData.date &&
      typeof latestData.date.year === "number" &&
      typeof latestData.date.month === "number" &&
      typeof latestData.date.day === "number"
    ) {
      // If newer documents store an object with year, month, day
      const { year, month, day } = latestData.date;
      formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(
        day
      ).padStart(2, "0")}`;
    }

    // Return JSON with the data
    res.json({
      co_gas: latestData.co_gas,
      temperature: latestData.temperature,
      humidity: latestData.humidity,
      pm2_5: latestData.pm2_5,
      pm10: latestData.pm10,
      place: latestData.place,
      date: formattedDate,
    });
  } catch (err) {
    console.error("Error fetching latest sensor data:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get historical data
export const getHistoricalData = async (req, res) => {
  try {
    // Grab the most recent 100 documents
    const history = await SensorReading.find().sort({ _id: -1 }).limit(100);

    // Format each record’s date
    const formattedHistory = history.map((doc) => {
      const item = doc.toObject(); // Convert Mongoose doc to plain object

      // Default
      let formattedDate = "Date unavailable";

      // 1) If item.date is a real JS Date
      if (item.date instanceof Date) {
        const d = item.date;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        formattedDate = `${year}/${month}/${day}`;
      }
      // 2) If item.date is {year, month, day}
      else if (
        item.date &&
        typeof item.date.year === "number" &&
        typeof item.date.month === "number" &&
        typeof item.date.day === "number"
      ) {
        const { year, month, day } = item.date;
        formattedDate = `${year}/${String(month).padStart(2, "0")}/${String(
          day
        ).padStart(2, "0")}`;
      }

      // Attach the final string as a separate field
      return {
        ...item,
        formattedDate,
      };
    });

    // Send back the final array
    res.json(formattedHistory);
  } catch (err) {
    console.error("Error fetching historical data:", err);
    res.status(500).json({ error: err.message });
  }
};
