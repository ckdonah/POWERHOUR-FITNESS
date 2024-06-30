import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./program.css";
import { treatDate } from "./treatDate";
import axios from "axios";
import yogaImage from "../../assets/yoga_june.jpeg";
import cardioImage from "../../assets/cardio_year.webp";
import pilatesImage from "../../assets/pilates_year.jpeg";
import Logo from "../../assets/logo.png";

const images = {
  yogaImage,
  cardioImage,
  pilatesImage,
};

function Program() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:7500/course");
        const { data } = response;
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const { program } = useParams();
  const image = images[`${program}Image`];
  const data = courses
    .filter((cours) => cours.type === "yoga")
    .reduce(sparate, {});
  console.log("data", data);

  function sparate(acc, cours) {
    const id = cours.trainerId._id;
    let array = acc[id];
    if (!array) {
      array = [];
      acc[id] = array;
    }
    array.push(cours);
    return acc;
  }
  const sessionDivs = Object.values(data)[1] || [];

  const programCourses = courses.filter((course) => course.type === program);
  const byTrainer = separate(programCourses);

  function separate(courses) {
    const object = courses.reduce((acc, course) => {
      const trainerId = course.trainerId._id;
      let array = acc[trainerId];
      if (!array) {
        array = [];
        acc[trainerId] = array;
      }
      array.push(course);
      return acc;
    }, {});
    return Object.values(object);
  }

  const byTrainerDivs = byTrainer.map(getDivs);

  function getDivs(courses) {
    const course0 = courses[0];
    const { trainerId, type } = course0;
    const { _id, firstName, lastName, picture } = trainerId;
    const trainerName = `${firstName} ${lastName}`;

    const courseDivs = courses.map((course) => {
      const { _id, name, coursePic, date, duration, capacity } = course;

      return (
        <Link key={_id} to={`/programs/${type}/courses/${trainerId}/${_id}`}>
          <div className="course-card">
            <h3>Course: {name}</h3>
            <img
              src={`http://localhost:7500/uploads/${coursePic}`}
              alt={`src for "${name}" image is incorrect: ${picture}`}
            />
            <p>Date: {date}</p>
            <p>Duration: {duration} Minutes</p>
            <p>Capacity:{capacity}</p>
          </div>
        </Link>
      );
    });

    return (
      <div key={_id} className="trainer-info">
        <div className="trainer-info-header">
          <div className="trainer-name-img">
            <img
              src={`http://localhost:7500/uploads/${picture}`}
              alt={`src for "${trainerName}" image is incorrect: ${picture}`}
            />
            <h3>Trainer Name: {trainerName}</h3>
          </div>
          <div className="back-programs">
            <Link to={`/programs`}>
              <span>Back to Programs</span>
            </Link>
          </div>
        </div>
        <div className="course-text">{courseDivs}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="header">
        <Link to="/" className="logo-link">
          <div className="logo-box">
            <img className="logo" src={Logo} alt="weight lifting logo" />
            <span className="logo-text">PowerHour</span>
          </div>
        </Link>
      </div>
      <div className="program-container">
        <div>{byTrainerDivs}</div>
      </div>
    </div>
  );
}

export default Program;

