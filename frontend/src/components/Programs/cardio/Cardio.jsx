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
            <h4>Trainer Name: Hassan .M </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/yoga/yoga-courses"><div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div> </Link>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Godwin .O </h4>
          </div>
          <section className="trainer-row">
          <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
          <div className="trainer-info">
            <h4>Trainer Name: Dany .M </h4>
          </div>
          <section className="trainer-row">
          <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={cardioImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
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
