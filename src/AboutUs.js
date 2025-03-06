import React from "react";
import { Link } from "react-router-dom";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "K.KANISTAN",
    regNo: "2021E064",
    image: "/images/kanistan.jpg", 
    linkedin: "https://www.linkedin.com/in/kanistan",
  },
  {
    name: "P.POGITHA",
    regNo: "2021E112",
    image: "/images/pogitha.jpg",
    linkedin: "https://www.linkedin.com/in/member2",
  },
  {
    name: "P.WHYSNAVI",
    regNo: "2021E114",
    image: "/images/whysnavi.jpg",
    linkedin: "https://www.linkedin.com/in/member3",
  },
  {
    name: "S.KOGULSIYAM",
    regNo: "2021E142",
    image: "/images/kogulsiyam.jpg",
    linkedin: "https://www.linkedin.com/in/member4",
  },
];

const AboutUs = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <h2>Air Quality Dashboard</h2>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
        </div>
      </nav>

      {/* About Us Content */}
      <div className="about-container">
        <h1>About Us</h1>
        <p>
          We are a group of four passionate individuals working on air quality
          monitoring.
        </p>

        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img
                src={member.image}
                alt={member.name}
                className="profile-image"
              />
              <h3>{member.name}</h3>
              <p>{member.regNo}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
