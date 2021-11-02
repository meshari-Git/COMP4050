/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @LeonJM @J5kinner @Ben450
 *
 */
import React from "react";
import "../assets/sass/pages/profilePage/profile.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Redirect, Link } from "react-router-dom";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import userService from "../services/user.js";

function Profile() {
  //this is used to set the display style of job-card-modal
  // const [ setModalDisplay] = useState("none");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    userService.profile().then((objects) => {
      console.log(objects);
      setUser(objects);
      if (objects) {
        setUpdatedUser(objects.user);
        console.log("ID: ", userService.isAuthenticated().id);
      }
    });
  }, [setUser]);

  const updateProfile = () => {
    userService.account_update(updatedUser).then((updated) => {
      handleClose();
      console.log("UPDATED: ", updated);
      console.log("USER: ", user);
      setUser({
        user: updated.updatedUser,
        ownedFavours: user.ownedFavours,
        operatedFavours: user.operatedFavours,
      });
      console.log(user);
    });
  };

  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postCode: "",
    DOB: "",
    bio: "",
  });

  const handleChangeUpdate = (name) => (event) => {
    setUpdatedUser({
      ...updatedUser,
      error: false,
      [name]: event.target.value,
    });
  };

  const terminateUser = () => {
    var r = window.confirm(
      "Are you sure you want to delete your account, this cannot be undone!"
    );
    if (r === true) {
      userService.account_terminate().then((respons) => {
        if (respons.email === user.email) {
          userService.logout(() => {
            setUser({});
          });
        } else {
          alert("Something went wrong...");
        }
      });
    }
  };

  //conditional rendering if statement
  const IF = (props) => {
    const condition = props.condition || false;
    const positive = props.then || null;
    const negative = props.else || null;

    return condition ? positive : negative;
  };

  //can be moved elsewhere and redone as a component.
  // const showJob = (job) => {
  //   //e.preventDefault();
  //   console.log("showJob Click");

  //   <Link
  //     to={{
  //       pathname: "/job",
  //       state: {
  //         job: job,
  //       },
  //     }}
  //   ></Link>;
  // };

  //can be moved elsewhere and redone as a component.
  // const closeJob = (e) => {
  //   e.preventDefault();
  //   console.log("closeJob Click");
  //   setModalDisplay("none");
  // };

  //test redirect to job page
  // const goToJob = (e) => {
  //   e.preventDefault();
  // };

  if (!userService.isAuthenticated()) {
    return <Redirect to="/login"></Redirect>;
  }

  if (!user || !user.user || !user.user.email) {
    //No Profile
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="profile-page">
        <div className="profile">
          <div className="profile-info">
            <div className="pro-img">
              <img
                alt="automated robot profile"
                src={"https://robohash.org/" + user.user.email}
              />
            </div>
            <div className="profile-details">
              <p>
                <strong>
                  {user.user.firstName} {user.user.lastName}
                </strong>
              </p>
              <p>
                <i>{user.user.address}</i>
              </p>
              <p>{user.user.email}</p>
            </div>
          </div>
          <div className="bio">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>Bio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.user.bio}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="create-btn">
            <Link to="/job/new">
              <Button variant="success">Create a Favour</Button>
            </Link>
          </div>
          <div className="buttons">
            <Button variant="warning" onClick={(e) => handleShow()}>
              Edit Profile
            </Button>
          </div>
          <div>
            <h3>
              Welcome {user.user.firstName} {user.user.lastName}!
            </h3>
          </div>
          <Table responsive bordered hover striped>
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
              {user.ownedFavours.map((favour) => (
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: "/job",
                        state: {
                          job: favour,
                        },
                      }}
                    >
                      {favour.title}
                    </Link>
                  </td>
                  <td>{favour.cost + " Tokens"}</td>
                  <td>
                    <IF
                      condition={favour.status === 0}
                      then={<p>Available</p>}
                    />
                    <IF condition={favour.status === 1} then={<p>Progressing</p>} />
                    <IF
                      condition={favour.status === 2}
                      then={<p>Complete</p>}
                    />
                  </td>
                  <td>{favour.ownerName}</td>
                  <td>{favour.operatorName}</td>
                  <td>{favour.timestamp}</td>
                </tr>
              ))}
              {user.operatedFavours.map((favour) => (
                <tr>
                  <td>
                    <Link
                      to={{
                        pathname: "/job",
                        state: {
                          job: favour,
                        },
                      }}
                    >
                      {favour.title}{" "}
                    </Link>
                  </td>
                  <td>{favour.cost + " Tokens"}</td>
                  <td>{favour.status}</td>
                  <td>{favour.ownerName}</td>
                  <td>{favour.operatorName}</td>
                  <td>{favour.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br></br>
          <br></br>
          <div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Edit Profile</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={updatedUser.email}
                      onChange={handleChangeUpdate("email")}
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="username"
                      placeholder="Username"
                      value={updatedUser.username}
                      onChange={handleChangeUpdate("username")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="firstname"
                      placeholder="First Name"
                      value={updatedUser.firstName}
                      onChange={handleChangeUpdate("firstName")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="lastname"
                      placeholder="Last Name"
                      value={updatedUser.lastName}
                      onChange={handleChangeUpdate("lastName")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control
                      type="dob"
                      placeholder="DD/MM/YYYY"
                      value={updatedUser.DOB}
                      onChange={handleChangeUpdate("DOB")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="address"
                      placeholder="Address"
                      value={updatedUser.address}
                      onChange={handleChangeUpdate("address")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="city"
                      placeholder="City"
                      value={updatedUser.city}
                      onChange={handleChangeUpdate("city")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Postcode</Form.Label>
                    <Form.Control
                      type="postcode"
                      placeholder="Postcode"
                      value={updatedUser.postCode}
                      onChange={handleChangeUpdate("postCode")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      type="bio"
                      placeholder="Bio"
                      value={updatedUser.bio}
                      onChange={handleChangeUpdate("bio")}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={updateProfile}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="del-btn">
            <Button variant="danger" onClick={(e) => terminateUser()}>
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
