# Air Quality Monitoring System

## Team Members
- **Kanistan K.** (2021e064@eng.jfn.ac.lk)
- **Pogitha P.** (2021e112@eng.jfn.ac.lk)
- **Whysnavi P.** (2021e114@eng.jfn.ac.lk)
- **Kogulsiyam S.** (2021e142@eng.jfn.ac.lk)

## Table of Contents
- [Introduction](#introduction)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [High-Level Architecture](#high-level-architecture)
- [Hardware & Software Design](#hardware--software-design)
- [Budget and Timeline](#budget-and-timeline)
- [Links](#links)

## Introduction
Air pollution poses a significant threat to public health and sustainable development, particularly in urban areas with high vehicle density and industrial activity. The proposed project, "Air Quality Monitoring System Based on Low Power Wide Area Network Technology at Public Transport Stops," focuses on addressing this issue in Kilinochchi. Leveraging IoT technologies and low-power wide-area network (LPWAN) communication, the system will monitor air quality in real-time at public transport stops.

This initiative aims to measure pollutant levels, such as particulate matter (PM2.5/PM10), CO, and NO2, using low-cost sensors and LoRaWAN technology for data transmission. The data will be visualized through an interactive web platform, enabling informed decision-making to mitigate pollution and improve public health in the region. This project not only contributes to environmental monitoring but also establishes a scalable solution for air quality management in other urban and rural areas.

## Problem Statement
- **Air Pollution at Public Transport Stops**: Public transport stops are hotspots for air pollution due to emissions from vehicles and high human activity, posing health risks to commuters and nearby residents.
- **Lack of Real-Time Monitoring**: There is no real-time air quality monitoring system in Kilinochchi to track pollutant levels, making it difficult to identify and address pollution effectively.

## Solution
- **IoT-Based Air Quality Monitoring**: Deploy IoT-enabled sensor nodes to measure pollutants like CO, NO2, PM2.5, and PM10, as well as temperature and humidity, in real-time.
- **LoRaWAN Technology**: Use low-power, wide-area network (LoRaWAN) technology to ensure cost-effective and energy-efficient data transmission over long distances.
- **Real-Time Monitoring Dashboard**: Develop a user-friendly application to visualize real-time and historical air quality data for stakeholders, including government authorities and the public.
- **Scalability and Affordability**: Design a low-cost and scalable system tailored to the resource constraints of Kilinochchi, enabling future expansion to other locations.
- **Informed Decision-Making**: Provide actionable insights to policymakers and environmental agencies for developing strategies to mitigate pollution at public transport stops.

## High-Level Architecture
### Sensor Nodes
- Collect air quality data, such as concentrations of pollutants (e.g., CO, NO₂) and environmental parameters (e.g., temperature).
- Use electrochemical sensors (e.g., MiCS 4514 for CO and NO₂) and temperature sensors (e.g., LM35).
- Convert analog data into digital format for transmission.

### Gateway
- Sensor nodes send collected data wirelessly to the gateway using LoRa technology.
- Acts as a central hub to receive data packets from sensor nodes.
- Integrated GSM/GPRS module for internet connectivity.
- Relays processed data to a remote database via HTTP POST requests.

### Backend System
- Centralized storage for all air quality data collected from sensor nodes.
- MySQL database structure includes tables for sensor data, user management, and API token validation.
- Gateway node establishes a GPRS connection.
- Secure data transfer to the database using HTTP POST requests with API token authentication.

### Web Application (Frontend and Backend)
#### Frontend
- Interactive web interface for users to view real-time air quality data.
- Built using HTML, CSS, and JavaScript for dynamic interaction.

#### Backend
- PHP and JavaScript handle data requests and logic for the web application.
- Hosts API endpoints for data input and output.

### Monitoring and Visualization
- Web interface displays pollution levels, temperature, and trends.
- Enables identification of pollution patterns and hotspots over time.

## Hardware & Software Design
### Key Components
- **Sensors**: MQ-7 (CO), PM2.5/PM10, MiCS 4514 for CO and NO₂, LM35 (Temperature).
- **Communication**: LoRaWAN and GSM Modules.
- **Microcontroller**: ESP32 Platform.
- **Software**: MySQL, Node.js, HTML, CSS, JavaScript.

### Security Measures
- Protect sensitive data from manipulation by factory owners.
- Secure server storage using API token authentication.

## Budget and Timeline
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

## Links
- [Proposal Document (PDF)](path/to/proposal.pdf)
- [Project Repository](#) *(Update with actual link)*
- [Project Page](#) *(Update with actual link)*
- [Department of Computer Engineering, University of Jaffna](#)
