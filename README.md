# Air Quality Monitoring System

## Team Members
- **Kanistan K.** (2021e064@eng.jfn.ac.lk) 
- **Pogitha P.** (2021e112@eng.jfn.ac.lk)
- **Whysnavi P.** (2021e114@eng.jfn.ac.lk)
- **Kogulsiyam S.** (2021e142@eng.jfn.ac.lk)

## Table of Contents
1. [Introduction](#introduction)
2. [Problem Statement](#problem-statement)
3. [Solution Overview](#solution-overview)
4. [System Architecture](#system-architecture)
5. [Hardware and Software Design](#hardware-and-software-design)
6. [Budget Overview](#budget-overview)
7. [Links](#links)

## Introduction
Air pollution is a critical concern, particularly in urban regions with heavy traffic and industrial activity. This project, titled "Air Quality Monitoring System Based on Low Power Wide Area Network Technology at Public Transport Stops," addresses air quality issues in Kilinochchi by leveraging advanced IoT technologies and low-power communication systems.

The primary goal is to measure pollutants such as PM2.5, PM10, CO, and NO₂ using low-cost sensors. The collected data will be transmitted through LoRaWAN to a centralized server for analysis and visualization, empowering stakeholders to make data-driven decisions to mitigate pollution.

## Problem Statement
1. **Air Pollution at Public Transport Stops**:
   Public transport stops are often hotspots for air pollution due to high vehicle emissions and increased human activity, posing health risks to commuters and nearby residents.

2. **Lack of Real-Time Monitoring**:
   Kilinochchi lacks an efficient real-time monitoring system, making it challenging to measure and respond to pollution effectively.

## Solution Overview
The system incorporates IoT-enabled sensors to collect real-time data on air quality parameters and environmental conditions. These sensors, connected via LoRaWAN, transmit data to a remote server. The solution includes:
- Real-time monitoring of pollutants and visualization on an interactive dashboard.
- Scalability to deploy in various locations with minimal cost.
- Actionable insights for policymakers and environmental agencies to mitigate pollution.

## System Architecture
### Components
1. **Sensor Nodes**:
   - Measure pollutants such as CO, NO₂, PM2.5, and PM10.
   - Use electrochemical sensors and temperature sensors for accurate data collection.

2. **Communication Gateway**:
   - Receives data from sensor nodes using LoRaWAN.
   - Sends processed data to a centralized server via GSM/GPRS.

3. **Backend System**:
   - Stores data in a MySQL database.
   - Ensures secure data transmission using token-based authentication.

4. **Web Application**:
   - Displays real-time and historical data using an intuitive user interface.
   - Developed using HTML, CSS, and JavaScript.

## Hardware and Software Design
### Hardware
- **Sensors**: MQ-7 (CO), MiCS 4514 (CO, NO₂), PM2.5/PM10 sensors, LM35 (Temperature sensor).
- **Communication Modules**: LoRaWAN, GSM/GPRS.
- **Microcontroller**: ESP32 for seamless integration and control.

### Software
- **Backend**: MySQL database and Node.js for data handling.
- **Frontend**: Web-based visualization using HTML, CSS, and JavaScript.
- **Data Security**: Token-based authentication for secure server communication.

## Budget Overview
| Component                       | Quantity | Price (LKR) |
|---------------------------------|----------|-------------|
| MQ-7 Carbon Monoxide Sensor    | 1        | 430         |
| ESP32-WROOM-32U                | 2        | 1,270       |
| Temperature Sensor Module       | 1        | 170         |
| Jumper Wire                     | 3        | 160         |
| Lithium Battery Charging Module | 2        | 60          |
| Li-ion Rechargeable Battery     | 4        | 350         |
| Battery Holder Case             | 2        | 70          |
| Project Board Breadboard        | 2        | 210         |
| GSM Antenna with IPEX to SMA    | 3        | 300         |
| Mini SIM800C GSM GPRS Module    | 1        | 1,450       |
| LoRa Ra-02 SX1278 Module        | 2        | 1,500       |
| **Total**                       |          | **10,050**  |


## Timeline

| **Activity**                                      | **5** | **6** | **7** | **8** | **9** | **10** | **11** | **12** | **13** | **14** |
|---------------------------------------------------|-------|-------|-------|-------|-------|--------|--------|--------|--------|--------|
| Research and component procurement               | 🟩    |       |       |       |       |        |        |        |        |        |
| System design and initial testing                |       | 🟩    |       |       |       |        |        |        |        |        |
| Hardware assembly                                 |       |       | 🟩    |       |       |        |        |        |        |        |
| Firmware development                              |       |       |       | 🟩    |       |        |        |        |        |        |
| Web application development and database setup   |       |       |       |       | 🟩    |   🟩     |        |        |        |        |
| System testing and user interface refinement     |       |       |       |       |       |      |     🟩   |        |        |        |
| Final integration and system debugging           |       |       |       |       |       |        |      |   🟩     |        |        |
| Project documentation and preparation for presentation |       |       |       |       |       |        |        |      |   🟩     |        |
| Final review and project submission              |       |       |       |       |       |        |        |        |      | 🟩     |



## Links
- [Proposal Document (PDF)](https://github.com/KKanistan06/Air-Quality-Monitoring/blob/3c390ac6118165626f1457eac2c57851fc94d5e1/Project-Proposal.pdf)
- [GitHub Repository](https://github.com/KKanistan06/Air-Quality-Monitoring)
- [Department of Computer Engineering, University of Jaffna](https://www.eng.jfn.ac.lk/)
