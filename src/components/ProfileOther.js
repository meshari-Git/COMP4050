/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React from "react";
import "../assets/sass/pages/profilePage/profile.scss";

// @ts-ignore
// import profilePic from '../../resources/userProfile/default-user.jpg'
import "../assets/css/sidebar.css";
import "../assets/css/sidebarnav.css";
import "../assets/css/userinfo.css";
// import userService from '../services/user.js';
import { Redirect, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Table, Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import userService from '../services/user.js';

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
      bio: ""
    },
    ownedFavours: [{}],
    operatedFavours: [{}]
  })

  const [notFound, setNotFound] = useState(false)

  const usernameToView = useParams().username

  useEffect(() => {
    userService.profile_other(usernameToView).then(resp => {
      setUser(resp)
      if(resp === null) {
          setNotFound(true)
      }
    })
  }, [setUser])


  console.log("USER: ", user)
  

  //can be moved elsewhere and redone as a component.
  const showJob = (e) => {
    e.preventDefault()
    console.log('showJob Click')
    // setModalDisplay('block')
  }

  //can be moved elsewhere and redone as a component.
  const closeJob = (e) => {
    e.preventDefault()
    console.log('closeJob Click')
    // setModalDisplay('none')
  }

  //test redirect to job page
  const goToJob = (e) => {
    e.preventDefault()

  }

  if (!userService.isAuthenticated()) {
    return (
      <Redirect to="/login"></Redirect>
    )
  }

  if (notFound) { 
      console.log("NOT FOUND")
    return (
      <h1>User Not Found</h1>
    )
  }

  if (!user || !user.user || !user.user.email) { //No Profile
    return (
      <h1>Loading...</h1>
    )
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
              <h3>Happy to see you {user.user.firstName} {user.user.lastName}!</h3>
              <Table bordered>
                <thead>
                  <tr>
                    {/* <th>Skills</th> */}
                    <th>Bio</th>
                    {/* <th>Stats</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr height="200em">
                    {/* <td>This is some text about the users skills</td> */}
                    <td>{user.user.bio}</td>
                    {/* <td>This is some text about the user Stats</td> */}
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <h5>Jobs</h5>
        <Table bordered hover striped>
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
            {user.ownedFavours && user.ownedFavours.length > 0 && user.ownedFavours.map(favour =>

              <tr key={favour._id} onClick={showJob}>
                <td>{favour.title}</td>
                <td>{favour.cost + " Tokens"}</td>
                <td>{favour.status}</td>
                <td>{favour.ownerName}</td>
                <td>{favour.operatorName}</td>
                <td>{favour.timestamp}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <br></br>
        <br></br>
      </div>
    )
  }
}


export default ProfileOther