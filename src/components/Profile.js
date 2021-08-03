import React from "react";
import "../assets/css/profile.css";
// @ts-ignore
//import profilePic from '../../resources/userProfile/default-user.jpg'
import "../assets/css/sidebar.css";
import "../assets/css/sidebarnav.css";
import "../assets/css/userinfo.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { isAuthenticated } from "../authentication/apiindex";

const Profile = () => {
  // const {
  //   user: { _id, name, email, address, balance, about, role },
  // } = isAuthenticated();
  const {
    user: { name, email, address, balance},
  } = isAuthenticated();

  // let rating = 0;

  // fetch("http://localhost:3000/rating?total=true&chosenUserID=" + _id)
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     rating = data.total;
  //   });

  return (
    <div className="Profile-page">
      <div className="sidebar">
        <div className="card-body">
          <div className="sidebarnav">
            <Link to="/">
              <h2 className="titles">Search for Jobs</h2>
            </Link>
          </div>
          <div className="sidebarnav">
            <Link to="/changeinfo">
              <h2 className="titles">Change Personal Information</h2>
            </Link>
          </div>

          <div className="sidebarnav">
            <Link to="/dashboard">
              <h2 className="titles">Dashboard</h2>
            </Link>
          </div>
        </div>
      </div>

      <div className="userinfo">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Hello {name},</h5>
            <p className="card-text">View or change your information.</p>
          </div>
        </div>

        <div className="card-group">
          <div className="card">
            <div className="card-header">Account Information</div>
            <div className="row">
              <div className="col-sm-6">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <h5>Contact Information</h5>
                    <p>{name}</p>
                    <p>{email}</p>
                  </blockquote>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <h5>Address</h5>
                    <p>{address}</p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h5 clas="card-title">Your Balance</h5>
          </div>
          <blockquote className="blockquote balance">
            <h5>${balance}</h5>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Profile;
