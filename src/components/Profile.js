import React from "react";
import "../assets/css/profile.css";
// @ts-ignore
// import profilePic from '../../resources/userProfile/default-user.jpg'
import "../assets/css/sidebar.css";
import "../assets/css/sidebarnav.css";
import "../assets/css/userinfo.css";
// import userService from '../services/user.js';
import { Redirect, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Table } from 'react-bootstrap';
import JobCard from './JobCard'
import {useState, useEffect} from 'react'
import userService from '../services/user.js';

function Profile() {

  //this is used to set the display style of job-card-modal
  const [modalDisplay, setModalDisplay] = useState('none')

  const [user, setUser] = useState({})

  useEffect(() => {          
          userService.profile().then(objects => {setUser( objects )})
  }, [setUser])


  //dummy job to test out JobCard component.
  const dummyJob = {
    ownerID: 'Leon',
    description: 'Using a shovel, you must dig me a giant hole.',
    title: 'Dig me a hole',
    status: 0,
    cost: 3,
    operatorID: null,
    city: 'Sydney',
    streetAddress: '42 Milky Way, Ryde 2650 NSW',
  }

  //can be moved elsewhere and redone as a component.
  const showJob = (e) => {
    e.preventDefault()
    console.log('showJob Click')
    setModalDisplay('block')
  }

  //can be moved elsewhere and redone as a component.
  const closeJob = (e) => {
    e.preventDefault()
    console.log('closeJob Click')
    setModalDisplay('none')
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

  if (!user || !user.email) { //No Profile
    return (
      <h1>Loading...</h1>
    )
  }  else {

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={3} lg={3} xl={3} className="text-center">
          <img alt="" src={"https://robohash.org/" + user.email}></img>
          <p>{user.email}</p>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="">
          <h3>Happy to see you {user.firstName} {user.lastName}!</h3>
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
                <td>{user.bio}</td>
                {/* <td>This is some text about the user Stats</td> */}
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <h5>Jobs</h5>
      <Link to="/job/new"><button className="btn btn-primary"> + Add </button></Link>
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
          <tr onClick={showJob}>
            <td>Mow the lawn</td>
            <td>2 tokens</td>
            <td>In Progress</td>
            <td>You (Ben Fricke)</td>
            <td>David Jones</td>
            <td>20/1/20</td>
          </tr>
          <tr onClick={showJob}>
            <td>Save my cat</td>
            <td>1 tokens</td>
            <td>Searching for help...</td>
            <td>You (Ben Fricke)</td>
            <td> - </td>
            <td>20/1/21</td>
          </tr>
          <tr onClick={showJob}>
            <td>Fix My Car</td>
            <td>20 tokens</td>
            <td>Completed</td>
            <td>You (Ben Fricke)</td>
            <td>Steve Jobs</td>
            <td>18/1/20</td>
          </tr>
          <tr onClick={showJob}>
            <td>Make me breakfast</td>
            <td>25 tokens</td>
            <td>Completed</td>
            <td>Donald Trump</td>
            <td>You (Ben Fricke)</td>
            <td>15/1/20</td>
          </tr>
        </tbody>
      </Table>
      <br></br>
      <br></br>

      {/* <div className = 'job-card-modal' style = {{
        display: modalDisplay,
      }}>
        <JobCard jobID = {dummyJob} hideJob = {closeJob}/>
      </div> */}
    </div>
  )
  }
}


export default Profile
