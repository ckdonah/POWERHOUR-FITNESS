import React from "react";
import yogaImage from "../../../assets/yoga .jpeg";
import "./Yoga.css";
import { Link } from "react-router-dom";

function Yoga() {
  return (
    <>
      <div className="yoga-container">
        <div>
          <button>back to home </button>
        </div>
        <div>
          <div className="trainer-info">
            <h4>Trainer Name: Hassan .M </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>hata yoga</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Zen Yoga Journey</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Mindful Yoga Flow</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Godwin .O </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Sunrise Yoga Retreat</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Harmony Yoga Practice</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Serenity Yoga Series</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Dany .M </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Energize Yoga Essentials</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Blissful Yoga Sessions</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
            <Link to="/programs/yoga/yoga-courses">
              <div className="cours-card">
                <h3>Peaceful Warrior Yoga</h3>
                <img src={yogaImage} width={300} />
                <p>Start Date:</p>
                <p>End date</p>
              </div>{" "}
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}

export default Yoga;
