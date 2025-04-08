import mqtt from "mqtt";
import SensorReading from "../models/SensorReading.js";

class MQTTService {
  constructor() {
    this.client = mqtt.connect("mqtt://test.mosquitto.org");
    this.topics = ["airquality/co", "airquality/lora"];
    console.log("MQTT Service initialized");
  }

  initialize() {
    this.client.on("connect", () => {
      this.topics.forEach((topic) => this.client.subscribe(topic));
      console.log("MQTT connected and subscribed to topics:", this.topics);
    });

    this.client.on("message", async (topic, message) => {
      try {
        // Convert Buffer to string
        const messageString = message.toString();
        console.log("Raw MQTT message:", messageString);

        // Check if message is in text format from LoRa gateway
        if (
          messageString.includes("Sensor Node") &&
          messageString.includes("Temp:")
        ) {
          // Parse text-based format
          let temperature = 0;
          let humidity = 0;
          let pm25 = 0;
          let pm10 = 0;
          let co = 0;

          // Extract temperature
          const tempMatch = messageString.match(/Temp:([\d.]+)/);
          if (tempMatch) temperature = parseFloat(tempMatch[1]);

          // Extract humidity
          const humMatch = messageString.match(/H:([\d.]+)/);
          if (humMatch) humidity = parseFloat(humMatch[1]);

          // Extract PM2.5
          const pm25Match = messageString.match(/PM2.5:([\d.]+)/);
          if (pm25Match) pm25 = parseFloat(pm25Match[1]);

          // Extract PM10
          const pm10Match = messageString.match(/PM10:([\d.]+)/);
          if (pm10Match) pm10 = parseFloat(pm10Match[1]);

          // Extract CO - handle the overflow value
          const coMatch = messageString.match(/CO:([\d.]+)/);
          if (coMatch) {
            const coValue = parseFloat(coMatch[1]);
            // Check if value is the max integer (overflow)
            co = coValue === 2147483647 ? 0 : coValue;
          }

          // Create data object
          const data = {
            place: "Sensor Node",
            date: {
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              day: new Date().getDate(),
            },
            temperature: temperature,
            humidity: humidity,
            pm2_5: pm25,
            pm10: pm10,
            co_gas: co,
          };

          console.log("Parsed data:", data);

          // Save to database
          const reading = new SensorReading(data);
          await reading.save();
          console.log("Saved sensor data to DB successfully");
          return;
        }

        // Try to parse as JSON if not in text format
        let messageData;
        try {
          messageData = JSON.parse(messageString);
        } catch (e) {
          console.log("Message not in JSON format, trying direct parsing");
          const value = parseFloat(messageString);
          if (!isNaN(value)) {
            messageData = { co: value };
          } else {
            throw new Error("Could not parse message as JSON or number");
          }
        }

        console.log("Parsed message:", messageData);

        // Extract CO value (might be in .co or as direct value)
        const coValue =
          messageData.co !== undefined
            ? messageData.co
            : typeof messageData === "number"
            ? messageData
            : 0;

        if (isNaN(coValue)) {
          throw new Error("Invalid CO value: " + coValue);
        }

        // Create data object with the correct field mapping
        const data = {
          place: "Sensor Node",
          date: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
          },
          co_gas: coValue,
          temperature: messageData.temperature || 0,
          humidity: messageData.humidity || 0,
          pm2_5: messageData.pm2_5 || 0,
          pm10: messageData.pm10 || 0,
        };

        console.log("Data to save:", data);

        const reading = new SensorReading(data);
        await reading.save();
        console.log("Saved MQTT data to DB successfully");
      } catch (error) {
        console.error("Error processing MQTT message:", error.message);
      }
    });
  }
}

export default new MQTTService();
