#include <Wire.h>
#include <LoRa.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <SoftwareSerial.h>
#include <WiFi.h>
#include <PubSubClient.h>

// WiFi credentials
const char* ssid = "KANISTAN 0178";
const char* password = "44q(Z697";

// MQTT configuration
const char* mqtt_server = "test.mosquitto.org";
const int mqtt_port = 1883;
const char* mqtt_client_id = "ESP32_AirQuality";
const char* mqtt_topic_co = "airquality/co";
const char* mqtt_topic_lora = "airquality/lora";

// OLED pins (I2C)
#define OLED_SDA 21
#define OLED_SCL 22

// LoRa pins
#define LORA_SS 5
#define LORA_RST 14
#define LORA_DIO0 2

// GSM pins (SIM800L)
#define GSM_TX 17
#define GSM_RX 16
#define LED_PIN 26

// MQ7 sensor pin
#define MQ7_PIN 34

Adafruit_SSD1306 display(128, 64, &Wire, -1);
SoftwareSerial gsmSerial(GSM_RX, GSM_TX);

WiFiClient espClient;
PubSubClient mqttClient(espClient);

unsigned long lastPublishTime = 0;
const long publishInterval = 30000;

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi connected\nIP address: ");
  Serial.println(WiFi.localIP());
}

void mqtt_callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect_mqtt() {
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (mqttClient.connect(mqtt_client_id)) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(mqttClient.state());
      Serial.println(" retrying in 5s");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(LED_PIN, OUTPUT);
  pinMode(MQ7_PIN, INPUT);

  // Initialize OLED
  Wire.begin(OLED_SDA, OLED_SCL);
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("SSD1306 allocation failed");
    while(1);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  
  // MQ7 warm-up
  display.println("Calibrating MQ7...");
  display.display();
  for(int i=0; i<30; i++) {
    analogRead(MQ7_PIN);
    delay(1000);
  }

  // Initialize LoRa
  LoRa.setPins(LORA_SS, LORA_RST, LORA_DIO0);
  if (!LoRa.begin(433E6)) {
    display.println("LoRa failed!");
    display.display();
    while(1);
  }
  display.println("LoRa OK");

  // Initialize GSM
  gsmSerial.begin(9600);
  delay(1000);
  gsmSerial.println("AT");
  delay(500);
  display.println("GSM OK");

  // Initialize WiFi
  setup_wifi();
  display.println("WiFi OK");

  // Initialize MQTT
  mqttClient.setServer(mqtt_server, mqtt_port);
  mqttClient.setCallback(mqtt_callback);
  display.println("MQTT OK");
  display.display();
  delay(2000);
}

float readCO() {
  int sensorValue = analogRead(MQ7_PIN);
  if(sensorValue < 100) {
    Serial.println("MQ7 Error: Check connections!");
    return -1.0;
  }
  
  float voltage = sensorValue * (3.3 / 4095.0);
  float ppm = sensorValue * 2000.0 / 4095.0;
  return ppm;
}

void publishSensorData() {
  float co_ppm = readCO();
  if(co_ppm < 0) return;
  
  String payload = "{\"co\":" + String(co_ppm) + "}";
  if (!mqttClient.publish(mqtt_topic_co, payload.c_str())) {
    Serial.println("MQTT publish failed");
  }
}

void loop() {
  if (!mqttClient.connected()) reconnect_mqtt();
  mqttClient.loop();

  unsigned long currentMillis = millis();
  if (currentMillis - lastPublishTime > publishInterval) {
    lastPublishTime = currentMillis;
    publishSensorData();
    
    // Update display
    display.clearDisplay();
    display.setCursor(0,0);
    display.println("CO Level:");
    display.setTextSize(2);
    display.println(String(readCO()) + " ppm");
    display.display();
  }

  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    String data;
    while (LoRa.available()) data += (char)LoRa.read();
    
    digitalWrite(LED_PIN, HIGH);
    delay(100);
    digitalWrite(LED_PIN, LOW);

    if (!mqttClient.publish(mqtt_topic_lora, data.c_str())) {
      Serial.println("LoRa MQTT publish failed");
    }

    if (data.indexOf("T:3") >= 0) {
      sendSMS("Alert: High Temperature!");
    }
  }
}

// SMS Function with Enhanced Error Handling
void sendSMS(String msg) {
  Serial.println("Attempting SMS send...");
  
  // 1. Set SMS mode
  gsmSerial.println("AT+CMGF=1");
  if(!waitForResponse("OK", 1000)) return;

  // 2. Set recipient number (YOUR NUMBER INTEGRATED HERE)
  gsmSerial.print("AT+CMGS=\"");
  gsmSerial.print("+940772664192");  // Your number in international format
  gsmSerial.println("\"");
  if(!waitForResponse(">", 2000)) return;

  // 3. Send message
  gsmSerial.print(msg);
  gsmSerial.write(26); // Ctrl+Z
  
  if(waitForResponse("+CMGS:", 10000)) {
    Serial.println("SMS sent successfully");
  } else {
    Serial.println("SMS failed");
  }
}

bool waitForResponse(const char* target, unsigned long timeout) {
  unsigned long start = millis();
  String response;
  
  while(millis() - start < timeout) {
    while(gsmSerial.available()) {
      char c = gsmSerial.read();
      response += c;
      if(response.indexOf(target) != -1) {
        Serial.println("GSM Response: " + response);
        return true;
      }
    }
  }
  Serial.println("Timeout waiting for: " + String(target));
  return false;
}
