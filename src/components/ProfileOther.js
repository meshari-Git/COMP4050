/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors:
 *
 */
import React from "react";
import "../assets/sass/pages/profilePage/profile.scss";

import "../assets/scss/sidebar.scss";
import { Redirect, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import userService from "../services/user.js";

function ProfileOther() {
  const [user, setUser] = useState({
    user: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      address: "",
      city: "",
      postCode: "",
      DOB: "",
      bio: "",
    },
    ownedFavours: [{}],
    operatedFavours: [{}],
  });

  const [notFound, setNotFound] = useState(false);

  const usernameToView = useParams().username;

  useEffect(() => {
    userService.profile_other(usernameToView).then((resp) => {
      setUser(resp);
      if (resp === null) {
        setNotFound(true);
      }
    });
  }, [setUser, usernameToView]);

  // console.log("USER: ", user);

  //can be moved elsewhere and redone as a component.
  const showJob = (e) => {
    e.preventDefault();
    // console.log("showJob Click");
    // setModalDisplay('block')
  };

  if (!userService.isAuthenticated()) {
    return <Redirect to="/login"></Redirect>;
  }

  if (notFound) {
    // console.log("NOT FOUND");
    return <h1>User Not Found</h1>;
  }

  if (!user || !user.user || !user.user.email) {
    //No Profile
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12} className="text-center">
            <img alt="" src={"https://robohash.org/" + user.user.email}></img>
            <p>{user.user.email}</p>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
            <div>
              <h3>
                Happy to see you {user.user.firstName} {user.user.lastName}!
              </h3>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Bio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr height="200em">
                    <td>{user.user.bio}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <Col xs={6} sm={6} md={6} lg={6} xl={6}>
          <div>
            <h5>Jobs</h5>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Listed By</th>
                  <th>Completed By</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {user.ownedFavours &&
                  user.ownedFavours.length > 0 &&
                  user.ownedFavours.map((favour) => (
                    <tr key={favour._id} onClick={showJob}>
                      <td>{favour.title}</td>
                      <td>{favour.cost + " Tokens"}</td>
                      <td>{favour.status}</td>
                      <td>{favour.ownerName}</td>
                      <td>{favour.operatorName}</td>
                      <td>{favour.timestamp}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </Col>

        <br></br>
        <br></br>
      </div>
    );
  }
}

export default ProfileOther;
