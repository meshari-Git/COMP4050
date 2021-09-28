/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
/*
all images sourced from https://undraw.co/
icons sourced from https://fontawesome.com/
*/

import React, { useState } from "react";
import Layout from "../components/Layout";
import { Redirect, Link, useParams } from "react-router-dom";
import userService from "../services/user.js";

//image + svg + css
import Robot from "../assets/img/robo.svg";
import ProfilePic from "../assets/img/profilePic.svg";
import Wave from "../assets/img/wave.png";
import "../assets/css/login.css";

const Reset = () => {
  const [values, setValues] = useState({
    password: "",
    password_confirm: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const resetToken = useParams().resetToken
  const userId = useParams().userId
  
  const { password, password_confirm, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    // prevent browser from reloading
    event.preventDefault();
    userService
      .reset(values.password, values.password_confirm, userId, resetToken)
      .then((response) => {
        setValues({ ...values, error: false });
        if (!response || response === null) {
          setValues({
            ...values,
            error: "An error occurred, it is likely the token used is too old.",
            loading: false,
          });
          return;
        }
        //Success -> Redirect To Login
        setValues({ ...values, redirectToReferrer: true }); //Update the redirect value to true
      })
      .catch((err) => {
        console.log(err);
        setValues({
          ...values,
          error: "Invalid Email",
          loading: false,
        });
        return;
      });
  };




  const resetForm = () => (
    <form>

      <div className="form-group">
        <div className="input-div two">
          <div className="i">
            <i className="fas fa-lock"></i>
          </div>
          <div className="div">
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="New Password"
              value={password}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <div className="input-div two">
          <div className="i">
            <i className="fas fa-lock"></i>
          </div>
          <div className="div">
            <input
              onChange={handleChange("password_confirm")}
              type="password"
              className="form-control"
              placeholder="Confirm New Password"
              value={password_confirm}
            />
          </div>
        </div>
      </div>

      <button onClick={clickSubmit} className="login-btn btn-primary">
        Reset Password
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "error logging in" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
        return <Redirect to="/login" />;
    }
  };

  return (
    <div className="login-body">
      <img className="wave" src={Wave} alt="wave" />
      <div className="container">
        <div className="img">
          <img src={Robot} alt="Programming a Robot" />

        </div>
        <div className="login-content">
        <img src={ProfilePic} alt="avatar" />

          <Layout title="Reset Password" description="Enter a new password">

            {showLoading()}
            {showError()}
            {resetForm()}
            {redirectUser()}
          </Layout>
          <Link to="/Register">Need an account?</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Reset;
