import React from "react";
import cardioImage from "../../../assets/cardio.jpeg";
import { Link } from "react-router-dom";

function Cardio() {
  return (
    <>
      <div>
        <div className="cardio-container">
          <div>
            <button>back to home </button>
          </div>
        </div>
        <div>
          <div className="trainer-info">
            <h4>Trainer Name: Alex .R </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/cardio/cardio-courses">
              <div className="cours-card">
                <h3>Heart-Pumping Cardio Challenge</h3>
                <img src={cardioImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <div className="cours-card">
              <h3>Cardio Burn Bootcamp</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>High-Intensity Cardio Blast</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Paul .M </h4>
          </div>
          <section className="trainer-row">
            <div className="cours-card">
              <h3>Cardio Power Hour</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>Ultimate Cardio Workout</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>Cardio Crush Fitness</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Samuel .F</h4>
          </div>
          <section className="trainer-row">
            <div className="cours-card">
              <h3>Sweat and Burn Cardio</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>Dynamic Cardio Circuit</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>Cardio Maxx</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Cardio;
