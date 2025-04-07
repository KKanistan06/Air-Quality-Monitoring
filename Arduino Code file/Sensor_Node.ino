#include <SPI.h>
#include <LoRa.h>
#include <Adafruit_GFX.h>d:\6th semi\Embedded system\Project\Final code\Gate_Way\Gate_Way.ino
#include <Adafruit_SSD1306.h>
#include <DHT.h>
#include <SDS011.h>
#include <MQ7.h>

#define DHTPIN 4          // DHT22 on D4
#define DHTTYPE DHT22     // DHT22 sensor
#define LED_PIN 25        // LED on D25

// OLED pins (SPI)
#define OLED_DC 21
#define OLED_CS 22
#define OLED_RST 16

// LoRa pins
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// SDS011 pins
#define SDS011_RX 13
#define SDS011_TX 12

// MQ7 pin
#define MQ7_PIN 34

Adafruit_SSD1306 display(128, 64, &SPI, OLED_DC, OLED_RST, OLED_CS);
DHT dht(DHTPIN, DHTTYPE);
SDS011 sds011;
MQ7 mq7(MQ7_PIN, 5.0); // Initialize MQ7 with analog pin and voltage

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  dht.begin();
  sds011.begin(SDS011_TX, SDS011_RX); // Initialize SDS011
  mq7.calibrate(); // Calibrate MQ7

  // Initialize OLED
  display.begin(SSD1306_SWITCHCAPVCC);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Sensor Node");
  display.display();
  delay(2000);

  // Initialize LoRa
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }
  Serial.println("LoRa initialized!");
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  float pm25, pm10;
  int mq7Value = mq7.readPpm(); // Read CO value

  if (isnan(temp) || isnan(hum)) {
    Serial.println("DHT22 error!");
    return;
  }

  if (sds011.read(&pm25, &pm10)) {
    Serial.println("SDS011 error!");
    return;
  }

  // Send data via LoRa
  LoRa.beginPacket();
  LoRa.print("T:");
  LoRa.print(temp);
  LoRa.print(",H:");
  LoRa.print(hum);
  LoRa.print(",PM2.5:");
  LoRa.print(pm25);
  LoRa.print(",PM10:");
  LoRa.print(pm10);
  LoRa.print(",CO:");
  LoRa.print(mq7Value);
  LoRa.endPacket();

  // Blink LED on transmission
  digitalWrite(LED_PIN, HIGH);
  delay(100);
  digitalWrite(LED_PIN, LOW);

  // Print to Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.print("°C, Humidity: ");
  Serial.print(hum);
  Serial.print("%, PM2.5: ");
  Serial.print(pm25);
  Serial.print("µg/m³, PM10: ");
  Serial.print(pm10);
  Serial.print("µg/m³, CO: ");
  Serial.print(mq7Value);
  Serial.println("ppm");

  // Update OLED
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Temp: ");
  display.print(temp);
  display.println("C");
  display.print("Hum: ");
  display.print(hum);
  display.println("%");
  display.print("PM2.5: ");
  display.print(pm25);
  display.println("µg/m³");
  display.print("PM10: ");
  display.print(pm10);
  display.println("µg/m³");
  display.print("CO: ");
  display.print(mq7Value);
  display.println("ppm");
  display.display();

  delay(5000); // Send every 5 seconds
}