import React from "react";
import pilatesImage from "../../../assets/pilates.jpeg";
import { Link } from "react-router-dom";
function Pilates() {
  return (
    <>
      <div className="pilates-container">
        <div>
          <button>back to home </button>
        </div>
        <div>
          <div className="trainer-info">
            <h4>Trainer Name: Hassan .M </h4>
          </div>
          <section className="trainer-row">
            <Link to="/programs/pilates/pilates-courses"><div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div> </Link>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
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
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
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
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
            <div className="cours-card">
              <h3>hata yoga</h3>
              <img src={pilatesImage} width={300} />
              <p>Start Date:</p>
              <p>End date</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Pilates;
