/*
all images sourced from https://undraw.co/
icons sourced from https://fontawesome.com/
*/

import React, { useState } from "react";
import Layout from "../components/Layout";
import { Redirect, Link } from "react-router-dom";
import userService from "../services/user.js";

//image + svg + css
import Robot from "../assets/img/robo.svg";
import ProfilePic from "../assets/img/profilePic.svg";
import Wave from "../assets/img/wave.png";
import "../assets/css/login.css";

const Forgot = () => {
  const [values, setValues] = useState({
    email: "bill@gmail.com",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    // prevent browser from reloading
    event.preventDefault();

    userService
      .forgot(values.email)
      .then((response) => {
        setValues({ ...values, error: false });
        if (!response || response === null) {
          setValues({
            ...values,
            error: "Invalid Email",
            loading: false,
          });
          return;
        }
        console.log(response);

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




  const forgotForm = () => (
    <form>

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
      <button onClick={clickSubmit} className="login-btn btn-primary">
        Send Reset Email
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

          <Layout title="Forgot Password" description="">

            {showLoading()}
            {showError()}
            {forgotForm()}
            {redirectUser()}
          </Layout>
          <Link to="/Register">Need an account?</Link>
          
        </div>
      </div>
    </div>
  );
};

export default Forgot;
