/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class History extends Component {

  render() {
    let jobList = this.props.jobs.map((job) => {
      return (
        <Link
          className="job"
          to={{
            pathname: "/job",
            state: { job: job, prevLocation: "/dashboard" },
          }}
        >
          <div className="card border-dark mb-3 dash-card">
            <div className="card-body text-dark dash-card-body">
              <h5 className="card-title">{job.title}</h5>
              <p className="card-text">{job.description}</p>
            </div>
            <div className="card-footer bg-transparent border-dark">
              <p className="jobLocation">Location: {job.location}</p>
              <p className="jobPrice">Cost: {job.price}</p>
            </div>
          </div>
        </Link>
      );
    });
    return (
      <div className="container">
        <h3 className="text-left py-3 ">Your Past Jobs</h3>
        <div className="row">{jobList}</div>
      </div>
    );
  }
}

export default History;
