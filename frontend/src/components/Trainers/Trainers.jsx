import React, { useEffect, useState } from "react";
import "./Trainers.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get("http://localhost:7500/trainer");
        setTrainers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrainers();
  }, []);

  const nextTrainers = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % trainers.length);
  };

  const prevTrainers = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 3 + trainers.length) % trainers.length);
  };

  if (trainers.length === 0) {
    return <div>Loading...</div>;
  }

  const visibleTrainers = trainers.slice(currentIndex, currentIndex + 3).concat(
    trainers.slice(0, Math.max(0, (currentIndex + 3) - trainers.length))
  );

  return (
    <section className="trainers page-section" id="trainers">
      <h2>Your Trainers</h2>
      <div className="trainer-list-wrapper">
        <FontAwesomeIcon icon={faArrowLeft} onClick={prevTrainers} className="arrow-icon" />
        <div className="trainer-list">
          {visibleTrainers.map((trainer, i) => (
            <div className="trainer-card" key={trainer._id}>
              <h3>{trainer.firstName}</h3>
              <div>
                <img
                  width="100%"
                  src={`http://localhost:7500/user/picture/${trainer._id}`}
                  alt={trainer.firstName}
                />
              </div>
              <p>{trainer.trainerDescription}</p>
            </div>
          ))}
        </div>
        <FontAwesomeIcon icon={faArrowRight} onClick={nextTrainers} className="arrow-icon" />
      </div>
    </section>
  );
};

export default Trainers;
