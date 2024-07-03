import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import "./Course.css";

function Course() {
  const { program, id } = useParams();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const { user } = useContext(AuthContext);

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

  const { trainerId, name, description, date, duration, capacity, coursePic } = courseData;
  const { firstName, lastName, picture } = trainerId;
  const trainerName = `${firstName} ${lastName}`;

  const handleBookNow = () => {
    if (user) {
      navigate(`/book-program/${id}`, { state: { course: courseData } });
    } else {
      navigate("/signup");
    }
  };

  return (
    <>
      <div className="singlepage">
        <div className="header">
          <Link to={`/programs/${program}`} className="back-link">
            &lt; Back to {program} Programs
          </Link>
        </div>
        <div className="singlepage-container">
          <div className="trainer-profile">
            <img src={`http://localhost:7500/uploads/${picture}`} alt={trainerName} />
            <p>{trainerName}</p>
          </div>
          <div className="description">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
          <div className="booking-card">
            <img src={`http://localhost:7500/uploads/${coursePic}`} alt={name} />
            <p>Date: {new Date(date).toLocaleDateString()}</p>
            <p>Duration: {duration} minutes</p>
            <p>Capacity: {capacity}</p>
            <button className="course-button" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
