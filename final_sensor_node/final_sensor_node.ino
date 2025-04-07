#include <Wire.h>  // I2C library
#include <SPI.h>
#include <LoRa.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <SDS011.h>
#include <MQ7.h>

#define DHTPIN 4          // DHT22 on GPIO4
#define DHTTYPE DHT22     // DHT22 sensor
#define LED_PIN 25        // LED on GPIO25

// I2C OLED - no need for pin definitions
// SDA -> GPIO21
// SCL -> GPIO22

// LoRa pins
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// SDS011 pins (UART)
#define SDS011_RX 13  // ESP32 RX ← SDS011 TX
#define SDS011_TX 12  // ESP32 TX → SDS011 RX

// MQ7 pin
#define MQ7_PIN 34

Adafruit_SSD1306 display(128, 64, &Wire, -1); // I2C OLED
DHT dht(DHTPIN, DHTTYPE);
SDS011 my_sds;  // SDS011 object
MQ7 mq7(MQ7_PIN, 5.0); // MQ7 with 5V logic

void setup() {
  Wire.begin(); // Initialize I2C
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  
  // Initialize SDS011 (UART)
  my_sds.begin(SDS011_TX, SDS011_RX);
  
  // Initialize MQ7 (calibrate for accurate readings)
  mq7.calibrate();
  Serial.println("Calibrating MQ7... (20s warm-up)");
  delay(20000); // Warm-up time for MQ7

  // Initialize I2C OLED
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C or 0x3D
    Serial.println("OLED init failed!");
    while (1);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Air Quality Monitor");
  display.display();
  delay(2000);

  // Initialize LoRa
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }
  Serial.println("LoRa initialized!");
  Serial.println("-----------------------------");
  Serial.println("Starting Sensor Readings...");
  Serial.println("-----------------------------");
}

void loop() {
  // [Rest of your loop() remains exactly the same]
  // Read DHT22 (Temp/Humidity)
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  if (isnan(temp) || isnan(hum)) {
    Serial.println("ERROR: Failed to read DHT22!");
  } else {
    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.print(" °C\tHumidity: ");
    Serial.print(hum);
    Serial.println(" %");
  }

  // Read SDS011 (PM2.5/PM10)
  float pm25, pm10;
  int sds_error = my_sds.read(&pm25, &pm10);
  if (sds_error) {
    Serial.println("ERROR: SDS011 read failed!");
  } else {
    Serial.print("PM2.5: ");
    Serial.print(pm25);
    Serial.print(" µg/m³\tPM10: ");
    Serial.print(pm10);
    Serial.println(" µg/m³");
  }

  // Read MQ7 (CO in ppm)
  int co_ppm = mq7.readPpm();
  Serial.print("CO Concentration: ");
    Serial.print(co_ppm);
    Serial.println(" ppm");

    // LoRa Transmission
    LoRa.beginPacket();
    LoRa.print("Sensor Node:01 data\n");  // Send the sensor node information and move to the next line
    LoRa.print("Temp:");                      // Send "T:" to LoRa to indicate the temperature data
    LoRa.print(temp); 
    LoRa.print(" 'C");                     // Send the temperature value to LoRa
    LoRa.print("\n");  
    LoRa.print("H:");                     // Send ",H:" to LoRa to indicate the humidity data
    LoRa.print(hum);  
    LoRa.print(" %");                      // Send the humidity value to LoRa
    LoRa.print("\n");  
    LoRa.print("PM2.5:");                 // Send ",PM2.5:" to LoRa to indicate the PM2.5 data
    LoRa.print(pm25);
    LoRa.print(" µg/m³");                       // Send the PM2.5 value to LoRa
    LoRa.print("\n");  
    LoRa.print("PM10:");                  // Send ",PM10:" to LoRa to indicate the PM10 data
    LoRa.print(pm10);
    LoRa.print(" µg/m³");                       // Send the PM10 value to LoRa
    LoRa.print("\n");  
    LoRa.print("CO:");                    // Send ",CO:" to LoRa to indicate the CO data
    LoRa.print(co_ppm);                    // Send the CO concentration value (ppm) to LoRa
    LoRa.print(" ppm"); 
    LoRa.print("\n");                      // Send a newline character to indicate the end of this line

    LoRa.endPacket();

    // Blink LED on success
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);

    // Update OLED
    display.clearDisplay();
    display.setCursor(0, 0);
    display.print("Sensor Node:01\n");
    display.print("Temp: "); display.print(temp); display.println(" C");
    display.print("Hum: "); display.print(hum); display.println(" %");
    display.print("PM2.5: "); display.print(pm25); display.println(" µg/m³");
    display.print("PM10: "); display.print(pm10); display.println(" µg/m³");
    display.print("CO: "); display.print(co_ppm); display.println(" ppm");
    display.display();

    Serial.println("-----------------------------");
    delay(5000); // Wait 5 sec between readings
}