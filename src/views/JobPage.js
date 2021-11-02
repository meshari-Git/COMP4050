/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @LeonJM @Ner0theHer0
 *
 */
import React, { Component } from "react";
import "../assets/sass/components/jobpage.scss";
import JobModal from "../components/JobEditModal";
import "bootstrap/dist/css/bootstrap.css";
import { isAuthenticated } from "../authentication/apiindex";
import jobService from "../services/job.js";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

class JobPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      job: this.props.location.state.job,
      user: "",
    };
    const userAuthenticated = isAuthenticated();
    if (userAuthenticated) {
      this.state.userID = userAuthenticated;
    }

    jobService.getFavour(this.state.job._id).then((res) => {
      this.setState({
        job: res.data,
      });
    });
  }

  componentDidUpdate() {
    jobService.getFavour(this.state.job._id).then((res) => {
      this.setState({
        job: res.data,
      });
    });
  }

  render() {
    var job = this.state.job;
    var user = this.state.userID;
    if (job.potentialOperators == null) {
      job.potentialOperators = [];
    }
    /*console.log("job: ", job, "\njob._id: ", job._id, "\nuser: ", user, "\nuser.token: ", user.token); {/*debug*/
    return (
      <div className="job-page">
        <div className="job-container">
          <div className="job-pictures">
            {job.images && job.images.length > 0 && (
              <img
                className="card-img-top"
                src={"/image/" + job.images[0]}
                alt="What the favour looks like"
              />
            )}
          </div>
          <div className="job-text-container">
            <div className="job-header">
              <div className="job-title">{job.title}</div>
              <div className="job-cost">{job.cost} Token(s)</div>
              <div className="job-location">
                <i class="fas fa-map-marker-alt"></i>
                {job.city}
              </div>
            </div>
            <div className="job-description">
              <h4>Description</h4>
              {job.description}
            </div>
          </div>
        </div>
        <div className="user-container">
          <div className="job-owner">
            <Link to={"/user/" + job.ownerName} className="profile-picture">
              <img
                alt="automated robot profile"
                src={"https://robohash.org/" + job.ownerName}
              />
            </Link>
            {/*<div className = "owner-name">
              {job.ownerName}
            </div>*/}
            <Link
              className="owner-name"
              to={{
                pathname: "/user/" + job.ownerName,
              }}
            >
              {job.ownerName}
            </Link>
          </div>
          {isAuthenticated() ? (
            user.id !== job.ownerID ? (
              job.operatorName != null ? (
                job.operatorName !== user.email ? (
                  <p style={{ paddingBottom: "10px" }}>
                    This job is already being actioned
                  </p>
                ) : (
                  job.status === 2 ? (
                    <p style={{ paddingBottom: "10px" }}>
                      You've completed this job and your balance has been updated.
                    </p>
                  ) : (
                    <div>
                      <p style={{ paddingBottom: "10px" }}>
                        You have been approved for this job! <br />
                        Click the button below to let the requester know that you're done
                      </p>
                      <button
                        className="accept-job-button"
                        onClick={(e) =>
                          jobService.completeFavour(job, user.token)
                        }
                      >
                        I've completed this job
                      </button>
                    </div>
                  )
                )
              ) : (
                <div className="accept-job-container">
                  <form className="accept-job">
                    <FloatingLabel
                      controlId="floatingTextarea2"
                      label="What skills can you provide?"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: "100px" }}
                      />
                    </FloatingLabel>
                    {/*{job.operatorID ?
                    <input type = "submit" className = "accept-job-button" value = "Accept Job" onClick = {(e) => jobService.acceptFavour(job, user.token)}>
                    </input> :
                    <input type = "submit" className = "accept-job-button" value = "Accepted" onClick = {(e) => jobService.cancelFavour(job, user.token)}>
                    </input>
                  }*/}
                    {job.potentialOperators.includes(user.email) === false ? (
                      <Link
                        className="accept-job-button"
                        onClick={(e) =>
                          jobService.acceptFavour(job, user.token)
                        }
                        to={{
                          pathname: "/job",
                          state: {
                            job: job,
                          },
                        }}
                      >
                        Accept Job
                      </Link>
                    ) : (
                      <div>
                        <p style={{ paddingBottom: "10px" }}>
                          Your application job is penidng approval from the
                          requester
                        </p>
                        <Link
                          className="accept-job-button"
                          onClick={(e) =>
                            jobService.cancelFavour(job, user.token)
                          }
                          to={{
                            pathname: "/job",
                            state: {
                              job: job,
                            },
                          }}
                        >
                          Cancel application
                        </Link>
                      </div>
                    )}
                  </form>
                </div>
              )
            ) : (
              job.status !== 2 ? (
                <div className="edit-job-container">
                <JobModal job={this.state.job} user={user} />
                <Link
                  className="delete-job-button"
                  onClick={(e) => jobService.delFavour(job, user.token)}
                  to={{
                    pathname: "/",
                  }}
                >
                  Delete Job
                </Link>
              </div>
              ) : (
                <Link
                  className="delete-job-button"
                  onClick={(e) => jobService.delFavour(job, user.token)}
                  to={{
                    pathname: "/",
                  }}
                >
                  Delete Job
                </Link>
              )
            )
          ) : (
            <div className="login-container">
              <Link
                className="login-job-button"
                to={{
                  pathname: "/login",
                }}
              >
                Login
              </Link>
            </div>
          )}
          {isAuthenticated() ? (
            user.id === job.ownerID ? (
              job.operatorName != null ? (
                job.status === 2 ? (
                  <p>{job.operatorName} has marked this favour as complete</p>
                ) : (
                  <p style={{ paddingBottom: "10px" }}>
                  {" "}
                  Operated by {job.operatorName}
                </p>
                )
              ) : job.potentialOperators.length === 0 ? (
                <p style={{ paddingBottom: "10px" }}>
                  No one has accepted this job yet
                </p>
              ) : (
                <div>
                  <table className="op-table">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Accept</th>
                      </tr>
                    </thead>
                    <tbody>
                      {job.potentialOperators.map((op) => (
                        <tr className="op-row">
                          <td>
                            <Link
                              className="owner-name2"
                              to={{
                                pathname: "/user/" + op,
                              }}
                            >
                              <p>{op}</p>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="appr-button"
                              onClick={(e) =>
                                jobService.approveFavour(job, user.token, op)
                              }
                            >
                              ✓
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default JobPage;
