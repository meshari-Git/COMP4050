/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/sass/components/forms/createJob.scss";
import "../assets/css/login.css";

import { Link, Redirect } from "react-router-dom";
import Layout from "../components/Layout";
import userService from "../services/user.js";
import jobService from "../services/job.js";
import Input from "../components/forms/Input";
import TextArea from "../components/forms/TextArea";
import FileUpload from "../components/forms/FileUpload";

const CreateJob = () => {
  const user = userService.isAuthenticated();

  const [newFavourInfo, setNewUserInfo] = useState({
    profileImages: [],
  });
  /* Image upload Handler */
  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newFavourInfo, profileImages: files });

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
    <div className="form-inputs">
      <h2>Title</h2>
      <Input
        handler={handleChange("title")}
        type="text"
        label="Title"
        value={title}
      />
      <h2>Description</h2>
      <TextArea
        handler={handleChange("description")}
        type="text"
        label="Description"
        value={description}
      />

      <div className="row">
        <h2>Location</h2>

        <div className="col">
          <Input
            handler={handleChange("city")}
            type="text"
            label="City"
            value={city}
          />
        </div>
        <div className="col">
          <Input
            handler={handleChange("postCode")}
            type="text"
            label="Post Code"
            value={postCode}
          />
        </div>
      </div>

      <Input
        handler={handleChange("streetAddress")}
        type="text"
        label="Address"
        value={streetAddress}
      />
      <div className="row">
        <div className="col">
          <h3>Reward</h3>
        </div>
        <div className="col">
          <Input
            handler={handleChange("cost")}
            type="number"
            label="Tokens"
            value={cost}
          />
        </div>
        <div className="col-9">
          <h3>for this favour</h3>
        </div>
      </div>
      <h4>Do you have any images for the favour?</h4>
      <FileUpload
        accept=".jpg,.png,.jpeg"
        label="Favour Image(s)"
        multiple
        fileCallBackUpdate={updateUploadedFiles}
      />
  <div className="spacer">
      <button onClick={clickSubmit} className="login-btn btn-favour">
        Submit
      </button>
      </div>
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
    <div className="new-favour-form">
      <Layout
        title="Create a Favour"
        description="Create a new Favour by filling out the form below"
        className="form-inputs"
      >
        {showSuccess()}
        {showError()}
        {createJobForm()}
      </Layout>
    </div>
  );
};

export default CreateJob;
