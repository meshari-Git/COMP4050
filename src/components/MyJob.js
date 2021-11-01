/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React, { Component, useState } from "react";
import "../assets/css/jobPage.css";

import { Link } from "react-router-dom";

class MyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      name: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/users?fetch=true&_id=" + this.state.userID)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ name: data[0].name });
      });
  }

  render() {
    const job = this.props.location.state.job;
    const seller = job.seller;
    return (
      <div className="container">
        <div className="card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                className="jobImage card-img-top"
                src={
                  "https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2522&q=80"
                }
              />
            </div>

            <div className="col-md-8">
              <div className="card-body">
                <div className="descriptionContainer">
                  <div>
                    <h3 className="card-title">{job.title}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Location: {job.location}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      Value: {job.price}
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="userCoinsIcon"
                        fill="#17a2b8"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6zM6.646 4.646c-.376.377-1.272 1.489-2.093 3.13l.894.448c.78-1.559 1.616-2.58 1.907-2.87l-.708-.708z"
                        />
                      </svg>
                    </h6>
                    <p className="card-text">{job.description}</p>
                    <div className="sellerDetails">
                      <h6 className="sellerName text-muted">
                        {"Listing by: " + this.state.name}
                      </h6>
                      <div className="ratingContainer">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 16 16"
                          className="bi bi-star-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <h6 className="sellerRating text-muted"> 4.5/5</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <Link to="/dashboard">
              <button className="btn btn-danger btn-lg active">Go Back</button>
            </Link>

            {job.userID == this.state.userID && (
              <Link to="/edit">
                <button className="btn btn-primary btn-lg active">Edit</button>
              </Link>
            )}

            {job.jobStatus == 0 && (
              <Link
                onClick={(e) => {
                  this.submitData(e);
                }}
              >
                <button className="btn btn-primary btn-lg active">
                  Apply for Job
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MyJob;
