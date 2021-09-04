import React, { Component } from "react";
import "../assets/css/jobpage.css";

import "bootstrap/dist/css/bootstrap.css";
import { isAuthenticated } from "../authentication/apiindex";

import { Link } from "react-router-dom";

class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      job: this.props.location.state.job,
    };
  }

  render() {
    var job = this.state.job;
    var user = this.state.userID;
    return (
      <div className = "job-page">
        <div className = "job-container">
          {console.log({job})}
          <div className = "job-pictures">
            {/*job.pictures show*/}
          </div>
          <div className = "job-text-container">
            <div className = "job-header">
              <div className = "job-title">
                {job.title}
              </div>
              <div className = "job-cost">
                {job.cost}
              </div>
              <div className = "job-location">
                {/*A symbol here? (See figma)*/}
                {job.city}
              </div>
            </div>
            <div className = "job-description">
              {job.description}
            </div>
          </div>
        </div>
        <div className = "user-container">
          <div className = "job-owner">
            <div className = "profile-picture">
            </div>
            <div className = "owner-name">
              {user.username}
            </div>
          </div>
          {user.ownedFavours.indexOf({job}) ?
            <div className = "accept-job">
              <div className = "text-box">

              </div>
              <button className = "accept-job-button">
                Accept Job
              </button>
            </div> :
            <div className = "edit-job-container">
              <div className = "edit-job-button">

              </div>
              <div className = "delete-job-button">
              
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default JobPage

/**
 * Original code.
 * Super messy, commenting it out for now.
 */

/*
class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      job: this.props.location.state.job,
    };
  }

  applyForJob(event) {
    event.preventDefault();
    this.updateVariables();

    var job = this.state.job;
    job.jobStatus = 2;
    job.chosenUserID = this.state.userID;

    let url = new URL("http://localhost:3000/jobs?replace=true");

    url.searchParams.set("replaceID", job._id);
    url.searchParams.set("userID", job.userID);
    url.searchParams.set("jobStatus", 2);
    url.searchParams.set("chosenUserID", job.chosenUserID);
    url.searchParams.set("title", job.title);
    url.searchParams.set("description", job.desc);
    url.searchParams.set("price", job.price);
    url.searchParams.set("location", job.location);

    fetch(url.href).then(() => {
      fetch("http://localhost:3000/jobs?fetch=true&_id=" + job._id)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            job: data,
          });
        });
    });
  }

  acceptChosenUser(event) {
    event.preventDefault();
    this.updateVariables();

    var job = this.state.job;
    job.jobStatus = 3;

    let url = new URL("http://localhost:3000/jobs?replace=true");

    url.searchParams.set("replaceID", job._id);
    url.searchParams.set("userID", job.userID);
    url.searchParams.set("jobStatus", 3);
    url.searchParams.set("chosenUserID", job.chosenUserID);
    url.searchParams.set("title", job.title);
    url.searchParams.set("description", job.desc);
    url.searchParams.set("price", job.price);
    url.searchParams.set("location", job.location);

    fetch(url.href).then(() => {
      fetch("http://localhost:3000/jobs?fetch=true&_id=" + job._id)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            job: data,
          });
        });
    });
  }

  declineChosenUser(event) {
    event.preventDefault();
    this.updateVariables();

    var job = this.state.job;
    job.jobStatus = 1;
    job.chosenUserID = " ";

    let url = new URL("http://localhost:3000/jobs?replace=true");

    url.searchParams.set("replaceID", job._id);
    url.searchParams.set("userID", job.userID);
    url.searchParams.set("jobStatus", 1);
    url.searchParams.set("chosenUserID", job.chosenUserID);
    url.searchParams.set("title", job.title);
    url.searchParams.set("description", job.desc);
    url.searchParams.set("price", job.price);
    url.searchParams.set("location", job.location);

    fetch(url.href).then(() => {
      fetch("http://localhost:3000/jobs?fetch=true&_id=" + job._id)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            job: data,
          });
        });
    });
  }

  markAsCompleted(event) {
    event.preventDefault();
    this.updateVariables();
    //http://localhost:3000/rating?rating=true&userID=5f728f406d252648c48c303e&chosenUserID=5f728f406d252648c48c303e&jobID=5f728f406d252648c48c303e&rating=-1

    var job = this.state.job;
    job.jobStatus = 4;

    let url = new URL("http://localhost:3000/jobs?replace=true");

    url.searchParams.set("replaceID", job._id);
    url.searchParams.set("userID", job.userID);
    url.searchParams.set("jobStatus", 4);
    url.searchParams.set("chosenUserID", job.chosenUserID);
    url.searchParams.set("title", job.title);
    url.searchParams.set("description", job.desc);
    url.searchParams.set("price", job.price);
    url.searchParams.set("location", job.location);

    fetch(url.href).then(() => {
      fetch("http://localhost:3000/jobs?fetch=true&_id=" + job._id)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({
            job: data,
          });

          url = new URL("http://localhost:3000/rating?add=true");

          url.searchParams.set("userID", job.userID);
          url.searchParams.set("chosenUserID", job.chosenUserID);
          url.searchParams.set("jobID", job._id);
          url.searchParams.set("rating", 1);

          fetch(url.href).then(() => {
            fetch("http://localhost:3000/jobs?fetch=true&_id=" + job._id)
              .then((resp) => resp.json())
              .then((data) => {
                this.setState({
                  job: data,
                });
              });
          });
        });
    });
  }

  componentDidMount() {
    fetch(
      "http://localhost:3000/users?fetch=true&_id=" +
        this.props.location.state.job.userID
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ name: data[0].name });
      });

    fetch(
      "http://localhost:3000/rating?total=true&chosenUserID=" +
        this.props.location.state.job.userID
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ rating: data.total });
      });

    fetch(
      "http://localhost:3000/users?fetch=true&_id=" +
        this.props.location.state.job.chosenUserID
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          chosenName: data[0].name,
          chosenEmail: data[0].email,
          chosenPicture: data[0].picture,
        });
      });

    fetch(
      "http://localhost:3000/rating?total=true&chosenUserID=" +
        this.props.location.state.job.chosenUserID
    )
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({ chosenRating: data.total });
      });
  }

  render() {
    const job = this.props.location.state.job;
    //const seller = job.seller;
    return (
      <div className="container">
        <div className="card">
          <div class="row no-gutters">
            <div className="col-md-4">
              <img
                className="jobImage card-img-top"
                src={
                  "https://picsum.photos/seed/" +
                  this.state.job._id +
                  "/400/400"
                }
                alt="Removing errors in alternative text"
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
                    <p className="card-text">
                      Job Status: {job.jobStatus === 1 && "Listed Job"}
                      {job.jobStatus === 2 && "Applied"}
                      {job.jobStatus === 3 && "Active"}
                      {job.jobStatus === 4 && "Completed"}
                    </p>
                    <div className="sellerDetails">
                      <h6 className="sellerName text-muted">
                        {"Listing by: " + this.state.name}
                      </h6>
                      <div className="ratingContainer">
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 16 16"
                          class="bi bi-star-fill"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <h6 className="sellerRating text-muted">
                          {" "}
                          {this.state.rating}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            <Link to={this.props.location.state.prevLocation}>
              <button className="btn btn-danger btn-lg active">Go Back</button>
            </Link>

            {job.userID === this.state.userID &&
              job.jobStatus !== 3 &&
              job.jobStatus !== 4 && (
                <Link to={{ pathname: "/edit", state: { job: job } }}>
                  <button className="btn btn-primary btn-lg active">
                    Edit
                  </button>
                </Link>
              )}

            {job.jobStatus === 1 &&
              isAuthenticated() &&
              job.userID !== this.state.userID && (
                <Link
                  onClick={(e) => {
                    this.applyForJob(e);
                  }}
                >
                  <button className="btn btn-primary btn-lg active">
                    Apply for Job
                  </button>
                </Link>
              )}

            {job.jobStatus === 3 && job.userID === this.state.userID && (
              <Link
                onClick={(e) => {
                  this.markAsCompleted(e);
                }}
              >
                <button className="btn btn-success btn-lg active">
                  Completed
                </button>
              </Link>
            )}
          </div>

          <div
            class="btn-toolbar"
            role="toolbar"
            aria-label="Toolbar with button groups"
          >
            {job.jobStatus === 2 &&
              job.userID === this.state.userID &&
              this.state.chosenName !== null && (
                <div class="card border-dark mb-3 dash-card">
                  <div class="card-body text-dark dash-card-body">
                    <h5 class="card-title">
                      {this.state.chosenName} Has Applied for this Job
                    </h5>
                    <p class="card-text">Email: {this.state.chosenEmail}</p>
                    <p class="card-text">Rating: {this.state.chosenRating}</p>
                    <img
                      className="chosenImage card-img-top"
                      src={this.state.chosenPicture}
                      alt="Removing errors in alternative text"

                    />
                  </div>
                  <div class="card-footer bg-transparent border-dark">
                    <Link
                      onClick={(e) => {
                        this.acceptChosenUser(e);
                      }}
                    >
                      <button className="btn btn-success btn-lg active">
                        Accept
                      </button>
                    </Link>

                    <Link
                      onClick={(e) => {
                        this.declineChosenUser(e);
                      }}
                    >
                      <button className="btn btn-danger btn-lg active">
                        Decline
                      </button>
                    </Link>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default JobPage;
*/

