import React from "react";
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

// import courses from "./courses.json";
import { useEffect, useState } from "react";

function Program() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:7500/course");
        // console.log(response);
        const { data } = response;
        // console.log(data);
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
  const sessionDivs = (Object.values(data)[1]||[])

  // console.log("ALL COURSES:", JSON.stringify(courses, null, "  "));

  const programCourses = courses.filter((course) => course.type === program);

  // programCourses is now an array of objects which
  // all have the `type` === `program`. We want to
  // divide this into separate arrays, one for each
  // trainer.
  // byTrainer = [
  //   [ <course 1 with trainer 1>,
  //     <course 2 with trainer 1>,
  //     ...
  //   ],
  //   [ <course A with trainer 2>,
  //     <course B with trainer 2>,
  //     ...
  //   ],
  //   ...
  // ]
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

    // object = { <1's id>: [<1'scourse>, ...], ...}
    return Object.values(object);
    // [[ <1's course>, ... ], [ <2's course >, ... ]]
  }

  // We want to create a div for each trainer with:
  // * Information about the trainer
  // * A div with information about each course run
  //   by that trainer
  const byTrainerDivs = byTrainer.map(getDivs);

  function getDivs(courses) {
    // Get information about the trainer from the first course.
    // (Each course object contains all this information, but
    // we only need to read it once.)
    const course0 = courses[0];
    const { trainerId, type } = course0;
    // {
    //   _id: "667966b8b875b1969644e69d",
    //   firstName: <string>,
    //   lastName: <string>,
    //   picture: <name>.jpg",
    // }
    const { _id, firstName, lastName, picture } = trainerId;

    const trainerName = `${firstName} ${lastName}`;

    // For each course, create a div which contains information
    // about that specific course (ignoring the information
    // about the trainer.)
    const courseDivs = courses.map((course) => {
      const { _id, name, picture, description, date, duration } = course;

      return (
        <div
          key={_id}
          className="trainer-info"
          style={{ border: "3px dashed blue" }}
        >
          <h3>Course name: {name}</h3>
          <p>Course Description: {description}</p>
          <p>date: {date}</p>
          <p>duration: {duration} minutes</p>
          <img
            src={picture}
            alt={`src for "${name}" image is incorrect:
        ${picture}`}
            style={{ color: "red" }}
          />
        </div>
      );
    });

    // Return a div for each trainer and their courses
    return (
      <div key={_id} style={{ border: "3px inset limegreen" }}>
        <h4>Trainer Name: {trainerName}</h4>
        <img
          src={`http://localhost:7500/uploads/${picture}`}
          alt={`src for "${trainerName}" image is incorrect:
        ${picture}`}
          style={{ color: "red" }}
        />
        {courseDivs}
      </div>
    );
  }

  return (
    <div>
      {/*
        Show a header for the page
       */}
      <div className="header">
        <Link to="/" className="logo-link">
          <div className="logo-box">
            <img className="logo" src={Logo} alt="weight lifting logo" />
            <span className="logo-text">PowerHour</span>
          </div>
        </Link>
      </div>

      {/*
        Show the information about each trainer and their courses
      */}
      <div className="program-container">
        <div>{byTrainerDivs}</div>
      </div>
    </div>
  );
}

export default Program;
