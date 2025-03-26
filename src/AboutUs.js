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

        <p>
          We are a team of passionate engineering students from the Faculty of
          Engineering, University of Jaffna. Our team consists of four
          members—two from the Computer Engineering Department and two from the
          Electrical and Electronic Engineering Department. 
          We are excited to
          work on innovative projects like this, leveraging our knowledge in
          technology and engineering to create impactful solutions. Our goal is
          to develop systems that contribute to a better and healthier
          environment.
        </p>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2025 Air Quality Monitoring System. Developed by K. Kanistan</p>
      </footer>
    </div>
  );
};

export default AboutUs;
