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

  if (!user || user === undefined || user.firstName === "") { //No Profile
    return (
      <h1>Loading...</h1>
    )
  }  else {

  return (
    <div>
      <Row>
        <Col xs={12} sm={12} md={3} lg={3} xl={3} className="text-center">
          <img alt="" src="data:image/jpeg;base64,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"></img>
          <p>{user.email}</p>
        </Col>
        <Col xs={12} sm={12} md={9} lg={9} xl={9} className="">
          <h3>Happy to see you {user.firstName} {user.lastName}!</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Skills</th>
                <th>Bio</th>
                <th>Stats</th>
              </tr>
            </thead>
            <tbody>
              <tr height="200em">
                <td>This is some text about the users skills</td>
                <td>This is some text about the user</td>
                <td>This is some text about the user Stats</td>
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
