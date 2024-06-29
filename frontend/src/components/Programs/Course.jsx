// import React from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { treatDate } from "./treatDate";
// import courses from "./courses.json";
// import "./Course.css";

// // Import trainer images
// import celinaOImage from "../../assets/celina_o.jpg";
// import markSImage from "../../assets/mark_s.jpg";

// const trainerImages = {
//   celina_o: celinaOImage,
//   mark_s: markSImage
// };

// function Course() {
//   const { program, course, trainer, id } = useParams();
//   const navigate = useNavigate();
//   // console.log({ program, course, trainer, id });

//   const trainerData = courses.find(data => data.shortName === trainer);
//   const { trainerName, classes } = trainerData;
//   const classData = classes.find(data => data.className === id);
//   const { startDate, endDate } = treatDate(classData);
//   const { startTime, duration, capacity, description } = classData;

//   const trainerImage = trainerImages[trainer];

//   const handleBookNow = () => {
//     navigate("/signup"); // Navigate to the signup page when the button is clicked
//   };

//   return (
//     <>
//     <div className="singlepage"></div>
//       <div className="header">
//         <Link to={`/programs/${program}`} className="back-link">
//           &lt; Back to {program} Programs
//         </Link>
//       </div>
//       <div className="singlepage-container">
//         <h1>{course}</h1>
//         <div className="trainer-profile">
//           <img src={trainerImage} alt={trainerName} />
//           <p>Name of Trainer: {trainerName}</p>
//         </div>
//         <div className="description">
//           <h2>{id}</h2>
//           <p>{description}</p>
//         </div>
//         <div className="booking-card">
//           <p>Start Date: {startDate}</p>
//           <p>End Date: {endDate}</p>
//           <p>Start Time: {startTime}</p>
//           <p>Duration: {duration}</p>
//           <p>Capacity: {capacity}</p>
//           <button onClick={handleBookNow}>Book Now</button>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Course;




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
  mark_s: markSImage
};

function Course() {
  const { program, course, trainer, id } = useParams();
  const navigate = useNavigate();
  const [trainerData, setTrainerData] = useState(null);
  const [classData, setClassData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        console.log("Fetching course data...");
        const response = await axios.get("http://localhost:7500/course");
        console.log("Response data:", response.data);
        const courses = response.data;

        const trainerData = courses.find(data => data.shortName === trainer);
        console.log("Trainer data:", trainerData);
        setTrainerData(trainerData);

        if (trainerData) {
          const classData = trainerData.classes.find(data => data.className === id);
          console.log("Class data:", classData);
          setClassData(classData);
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, [trainer, id]);

  if (!trainerData || !classData) {
    return <div>Loading...</div>;
  }

  const { trainerName } = trainerData;
  const { startDate, endDate } = treatDate(classData);
  const { startTime, duration, capacity, description } = classData;
  const trainerImage = trainerImages[trainer];

  const handleBookNow = () => {
    navigate("/signup"); // Navigate to the signup page when the button is clicked
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
          <h1>{course}</h1>
          <div className="trainer-profile">
            <img src={trainerImage} alt={trainerName} />
            <p>Name of Trainer: {trainerName}</p>
          </div>
          <div className="description">
            <h2>{id}</h2>
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

