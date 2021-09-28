/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, Redirect } from "react-router-dom";
import userService from "../services/user.js";
import jobService from "../services/job.js";
import "../assets/css/dashboard.css";
import "bootstrap/dist/css/bootstrap.css";
// import {Row, Col, Form} from './react-bootstrap';

// import {FloatingLabel} from './react-bootstrap';

const CreateJob = () => {
  const user = userService.isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    description: "",
    cost: 0,
    city: "",
    streetAddress: "",
    postCode: "",
    error: "",
    success: false,
  });

  const {
    title,
    description,
    cost,
    city,
    streetAddress,
    postCode,
    success,
    error,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    // prevent browser from reloading
    event.preventDefault();
    setValues({ ...values, error: false });

    jobService
      .addJob(
        {
          title: title,
          description: description,
          cost: cost,
          city: city,
          streetAddress: streetAddress,
        },
        user.token
      )
      .then((response) => {
        if (response.error) {
          setValues({ ...values, error: response.error, success: false });
        } else {
          setValues({
            ...values,
            title: "",
            description: "",
            cost: 0,
            city: "",
            streetAddress: "",
            error: "",
            success: true,
          });
        }
      });
  };

  if (!userService.isAuthenticated()) {
    return <Redirect to="/login"></Redirect>;
  }

  const createJobForm = () => (
    <div>
      <form>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange("title")}
            type="text"
            className="form-control"
            value={title}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <input
            onChange={handleChange("description")}
            type="text"
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Cost</label>
          <input
            onChange={handleChange("cost")}
            type="number"
            className="form-control"
            value={cost}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Address</label>
          <input
            onChange={handleChange("streetAddress")}
            type="text"
            className="form-control"
            value={streetAddress}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="text-muted">City</label>
            <input
              onChange={handleChange("city")}
              type="text"
              className="form-control"
              value={city}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="text-muted">Postcode</label>
            <input
              onChange={handleChange("postCode")}
              type="text"
              className="form-control"
              value={postCode}
            />
          </div>
        </div>
        {/* <Row className="g-2">
  <Col md>
    <FloatingLabel controlId="floatingInputGrid" label="Email address">
      <Form.Control type="email" placeholder="name@example.com" />
    </FloatingLabel>
  </Col>
  <Col md>
    <FloatingLabel controlId="floatingSelectGrid" label="Works with selects">
      <Form.Select aria-label="Floating label select example">
        <option>Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
    </FloatingLabel>
  </Col>
</Row> */}

        <button onClick={clickSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Success Job Added View Here: <Link to="/profile">Profile</Link>
    </div>
  );

  return (
    <Layout
      title="Create Job "
      description="Create A New Job"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {createJobForm()}
    </Layout>
  );
};

export default CreateJob;
