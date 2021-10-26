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
import { Redirect, Link } from "react-router-dom";
// import { login, authenticate, isAuthenticated } from "../authentication/apiindex";
import userService from "../services/user.js";

//image + svg + css
import Robot from "../assets/img/robo.svg";
import ProfilePic from "../assets/img/profilePic.svg";
import Wave from "../assets/img/wave.png";
import "../assets/css/login.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "bill@gmail.com",
    password: "pass",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = userService.isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    // prevent browser from reloading
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    userService
      .login(values.email, values.password)
      .then((response) => {
        setValues({ ...values, error: false, password: "" });
        if (!response || response === null || response.error) {
          setValues({
            ...values,
            error: "Invalid Username Or Password",
            loading: false,
          });
          return;
        }
        console.log(response);

        //Stores the user object in local storage
        userService.authenticate(response, () => {
          setValues({ ...values, redirectToReferrer: true }); //Update the redirect value to true
        });
      })
      .catch((err) => {
        console.log(err);
        setValues({
          ...values,
          error: err.error
        });
        return;
      });
  };




  const loginForm = () => (
    <form className="login-form">

      <div className="form-group">
        <label className="text-muted">Email</label>
        <div className="input-div one" >
          <div className="i">
            <i className="fas fa-user"></i>
          </div>
          <div className="div">
            <input
              onChange={handleChange("email")}
              type="email"
              className="input"
              placeholder="Email"
              value={email}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <div className="input-div two">
          <div className="i">
            <i className="fas fa-lock"></i>
          </div>
          <div className="div">
            <input
              onChange={handleChange("password")}
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
            />
          </div>
        </div>
      </div>
      <button onClick={clickSubmit} className="login-btn btn-primary">
        Login
      </button>
    </form>
  );

  const showError = () => {
    if(error) {
      return(
        <div
          className="alert alert-danger"

        >
          {error}
        </div>
      )
    } 
  }

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h4>Loading...</h4>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      //if (user) {
        return <Redirect to="/profile" />;
      //}
    }
  };

  return (
    <div className="login-body">
      <img className="wave" src={Wave} alt="wave" />
      <div className="container">
        <div className="img">
          <img src={Robot} alt="Programming   Robot" />

        </div>
        <div className="login-content">
        <img src={ProfilePic} alt="avatar" />

          <Layout title="Login" description="Welcome Back">

            {showLoading()}
            {showError()}
            {loginForm()}
            {redirectUser()}
          </Layout>
          <Link className="link" to="/forgot">Forgot Password?</Link>
          <br></br>
          <Link className="link" to="/Register">Need an account?</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
