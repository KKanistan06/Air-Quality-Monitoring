# Air Quality Monitoring System

## Team Members
- **Kanistan K.** (2021e064@eng.jfn.ac.lk)
- **Pogitha P.** (2021e112@eng.jfn.ac.lk)
- **Whysnavi P.** (2021e114@eng.jfn.ac.lk)
- **Kogulsiyam S.** (2021e142@eng.jfn.ac.lk)

## Table of Contents
- [Introduction](#introduction)
- [Solution Architecture](#solution-architecture)
- [Hardware & Software Designs](#hardware--software-designs)
- [Links](#links)

## Introduction
Air pollution poses a significant threat to public health and sustainable development, particularly in urban areas with high vehicle density and industrial activity. This project, "Air Quality Monitoring System," aims to monitor and mitigate air pollution in Kilinochchi by leveraging IoT technologies and LPWAN communication.

The system will measure pollutants such as CO, NO₂, PM2.5, and PM10 in real-time using low-cost sensors. Data will be transmitted via LoRaWAN to a centralized database for processing and visualization. This project contributes to environmental monitoring and establishes a scalable solution for other regions.

## Solution Architecture
### Key Features
- **IoT-Based Monitoring**: Sensors to measure pollutants and environmental parameters.
- **LoRaWAN Communication**: Efficient and cost-effective data transmission.
- **Real-Time Dashboard**: User-friendly interface to visualize air quality data.
- **Scalability**: Expandable for future deployments.

### Components
- Sensors: MQ-7 (CO), MiCS 4514 (CO, NO₂), PM2.5/PM10, LM35 (Temperature)
- Communication: LoRaWAN and GSM/GPRS
- Backend: MySQL, Node.js
- Frontend: Angular.js for interactive web visualization

### Workflow
1. Sensor nodes collect air quality data.
2. Data is transmitted via LoRaWAN to the gateway.
3. Gateway sends data to the server using GSM/GPRS.
4. Data is processed and visualized on a web platform.

## Hardware & Software Designs
### Hardware
- MQ-7 CO Sensor
- PM2.5/PM10 Sensor
- MiCS 4514 for CO and NO₂
- LoRaWAN and GSM Modules
- ESP32 Microcontroller

### Software
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: PHP, Node.js
- **Database**: MySQL

### Security Measures
- Protect sensitive data from manipulation by factory owners.
- Secure server storage using API token authentication.

## Links
- [Project Repository](#) *(Update with actual link)*
- [Project Page](#) *(Update with actual link)*
- [Department of Computer Engineering, University of Jaffna](#)
