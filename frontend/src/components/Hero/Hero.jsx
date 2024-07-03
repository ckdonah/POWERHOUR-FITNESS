import React, { useEffect, useState } from "react";
import "./Hero.css";
import { Link } from "react-router-dom";
import axios from "axios";
import heroImage from "../../assets/gym hero.jpeg";

function Hero() {
  const [stats, setStats] = useState({
    trainers: 0,
    members: 0,
    programs: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:7500/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      className="hero-section"
      id="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <span className="outline-text">MAXIMIZE YOUR</span>
              <br />
              <span className="bold-text">POTENTIAL EVERY</span>
              <br />
              <span className="outline-text">HOUR</span>
            </h1>
            <Link to="/signup" className="get-started">
              Get started
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>+{stats.trainers}</strong>
              <br />
              EXPERT TRAINERS
            </div>
            <div>
              <strong>+{stats.members}</strong>
              <br />
              MEMBERS JOINED
            </div>
            <div>
              <strong>+{stats.programs}</strong>
              <br />
              FITNESS PROGRAMS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
