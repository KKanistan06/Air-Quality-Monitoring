#include <SPI.h>
#include <LoRa.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <SoftwareSerial.h>

// OLED pins (SPI)
#define OLED_DC 21
#define OLED_CS 22
#define OLED_RST 15

// LoRa pins
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// GSM pins (SIM800L)
#define GSM_TX 17
#define GSM_RX 16
#define LED_PIN 26

Adafruit_SSD1306 display(128, 64, &SPI, OLED_DC, OLED_RST, OLED_CS);
SoftwareSerial gsmSerial(GSM_RX, GSM_TX); // RX, TX

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);

  // Initialize OLED
  display.begin(SSD1306_SWITCHCAPVCC);
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Gateway Node");
  display.display();
  delay(2000);

  // Initialize LoRa
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed!");
    while (1);
  }
  Serial.println("LoRa initialized!");

  // Initialize GSM
  gsmSerial.begin(9600);
  delay(1000);
  gsmSerial.println("AT");
  delay(500);
  Serial.println("GSM ready!");
}

void loop() {
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String data;
    while (LoRa.available()) {
      data += (char)LoRa.read();
    }

    // Blink LED on reception
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);

    // Print to Serial Monitor
    Serial.print("Received: ");
    Serial.println(data);

    // Update OLED
    display.clearDisplay();
    display.setCursor(0, 0);
    display.setTextSize(1.5);
    display.println("Gateway Data:");
    display.println(data);
    display.display();

    // Send SMS if temperature > 30°C
    if (data.indexOf("T:3") >= 0) {
      sendSMS("Alert: High Temperature!");
    }
  }
}

void sendSMS(String msg) {
  gsmSerial.println("AT+CMGF=1"); // SMS text mode
  delay(500);
  gsmSerial.println("AT+CMGS=\"+1234567890\""); // Replace with your number
  delay(500);
  gsmSerial.print(msg);
  delay(500);
  gsmSerial.write(26); // Ctrl+Z to send
  Serial.println("SMS sent!");
}