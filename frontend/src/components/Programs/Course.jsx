import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { treatDate } from "./treatDate";
import axios from "axios";
import "./Course.css";

// Import trainer images
import celinaOImage from "../../assets/celina_o.jpg";
import markSImage from "../../assets/mark_s.jpg";

const trainerImages = {
  celina_o: celinaOImage,
  mark_s: markSImage,
};

function Course() {
  const { program, trainer, id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:7500/course/${id}`);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [id]);

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const { trainerId, name, description, date, duration, capacity, picture } = courseData;
  const { firstName, lastName, shortName } = trainerId;
  const trainerName = `${firstName} ${lastName}`;
  const startDate = treatDate(date).startDate;
  const endDate = treatDate(date).endDate;
  const startTime = new Date(date).toLocaleTimeString();

  const handleBookNow = () => {
    navigate("/signup");
  };

  const trainerImage = trainerImages[shortName];

  return (
    <>
      <div className="singlepage">
        <div className="header">
          <Link to={`/programs/${program}`} className="back-link">
            &lt; Back to {program} Programs
          </Link>
        </div>
        <div className="singlepage-container">
          <h1>{name}</h1>
          <div className="trainer-profile">
            <img src={trainerImage} alt={trainerName} />
            <p>Name of Trainer: {trainerName}</p>
          </div>
          <div className="description">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="booking-card">
            <p>Start Date: {startDate}</p>
            <p>End Date: {endDate}</p>
            <p>Start Time: {startTime}</p>
            <p>Duration: {duration} minutes</p>
            <p>Capacity: {capacity}</p>
            <button onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;



