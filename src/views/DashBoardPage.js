/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: @Ner0theHer0
  * 
  */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/scss/dashboard.scss";

import ActiveListings from "../components/ActiveListings";
import CurrentJobs from "../components/CurrentJobs";
import History from "../components/History";
import Info from "../components/Info";
//import DataFill from "../JSX/DataFill";
import { isAuthenticated } from "../authentication/apiindex";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    if (isAuthenticated()) {
      const {
        user: { _id, name, email, address, balance, about, role },
      } = isAuthenticated();
      
      this.state = {
        location: null,
        userID: _id,
        email: email,
        address: address,
        name: name,
        balance: balance,
        about: about,
        role: role,
        jobs: [],
      };
    } else {
      this.state = {
        location: null,
        userID: null,
        name: null,
        balance: null,
        jobs: [],
      };
    }
  }

  render() {
    // Get user info if authenticated


    var uID = this.props.userID;

    var myJobs = this.props.jobs;
    myJobs = this.props.jobs.filter(function (job) {
      return job.chosenUserID === uID && job.jobStatus !== 4;
    });

    var activeJobs = this.props.jobs;
    activeJobs = this.props.jobs.filter(function (job) {
      return job.userID === uID && job.jobStatus !== 4;
    });

    var pastJobs = this.props.jobs;
    pastJobs = this.props.jobs.filter(function (job) {
      return (
        (job.userID === uID || job.chosenUserID === uID) && job.jobStatus === 4
      );
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg"></div>
            <div className="col-lg">
              <Link
                to={{ pathname: "/add", state: { prevLocation: "/dashboard" } }}
              >
                <button className="btn btn-success btn-lg active">
                  Create A New Job
                </button>
              </Link>
              <Info uID={this.props.userID} />
              <CurrentJobs jobs={myJobs} userID={this.props.userID} />
              <ActiveListings jobs={activeJobs} userID={this.props.userID} />
              <History jobs={pastJobs} userID={this.props.userID} />
            </div>
            <div className="col-lg"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashBoard;
