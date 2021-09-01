/*
all images sourced from https://undraw.co/
icons sourced from https://fontawesome.com/
*/

import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import userService from "../services/user.js";
//import TextInput from "../components/TextInput";

//image + svg + css
import Fatherhood from "../assets/img/fatherhood.svg";
import Wave from "../assets/img/wave.png";
import "../assets/css/register.css";

const Register = () => {
  const [values, setValues] = useState({
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
    error: "",
    success: false,
  });

  const {
    username,
    firstName,
    lastName,
    password,
    email,
    address,
    city,
    postCode,
    DOB,
    bio,
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

    userService
      .register(
        username,
        firstName,
        password,
        email,
        address,
        DOB,
        lastName,
        city,
        postCode,
        bio
      )
      .then((response) => {
        if (response.error) {
          setValues({ ...values, error: response.error, success: false });
        } else {
          setValues({
            ...values,
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
            error: "",
            success: true,
          });
        }
      });
  };

  const registerForm = () => (
    <form>
      <div className="row">
      <div className="form-group">
              {/* <label className="text-muted">Username</label> */}
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("username")}
                    type="text"
                    placeholder="User Name"
                    className="input"
                    value={username}
                  />
                </div>
              </div>
            </div>
        <div className="column">
          <div className="column-1">
            <div className="form-group">
              {/* <label className="text-muted">First Name</label> */}

              <div className="input-div">
                <div className="i">
                  <i className="fas fa-signature"></i>
                </div>
                <div className="div">
                  {/* this is going to be the next phase input animator similar to twitter sign up form */}
                  {/* <TextInput label="First Name" onChange={handleChange("firstName")} value={firstName}/> */}

                  <input
                    onChange={handleChange("firstName")}
                    type="text"
                    className="input"
                    placeholder="First Name"
                    value={firstName}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              {/* <label className="text-muted">Address</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("address")}
                    type="text"
                    className="input"
                    placeholder="Address"
                    value={address}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              {/* <label className="text-muted">Postcode</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("postCode")}
                    type="text"
                    className="input"
                    placeholder="Post code"
                    value={postCode}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              {/* <label className="text-muted">Email</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-paper-plane"></i>
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
          </div>
        </div>

        <div className="column">
          <div className="column-2">
            <div className="form-group">
              {/* <label className="text-muted">Last Name</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-signature"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("lastName")}
                    type="text"
                    className="input"
                    placeholder="Last Name"
                    value={lastName}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              {/* <label className="text-muted">City</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("city")}
                    type="text"
                    className="input"
                    placeholder="City"
                    value={city}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              {/* <label className="text-muted">Date Of Birth</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-calendar-week"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("DOB")}
                    type="text"
                    className="input"
                    placeholder="Date of Birth"
                    value={DOB}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              {/* <label className="text-muted">Password</label> */}
              <div className="input-div">
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("password")}
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={password}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
              {/* <label className="text-muted">Biography</label> */}
              <div className="input-div one">
                <div className="i">
                  <i className="fas fa-book"></i>
                </div>
                <div className="div">
                  <input
                    onChange={handleChange("bio")}
                    type="text"
                    placeholder="What are some skills you have?"
                    className="input"
                    value={bio}
                  />
                </div>
              </div>
            </div>
      </div>

      <button onClick={clickSubmit} className="register-btn btn-primary">
        Sign Up
      </button>
    </form>
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
      style={{ display: success ? "yay it worked" : "none" }}
    >
      New account is created. Please <Link to="/login">log in</Link>
    </div>
  );

  
  return (
    <div className="register-body">
      <img className="wave-reg" src={Wave} alt="wave" />
      <div className="container">
        <div className="register-content">
          <Layout title="Register" description="Create a new account">
            {showSuccess()}
            {showError()}
            {registerForm()}
          </Layout>
        </div>
        <div className="img">
          <img src={Fatherhood} alt="Father Teaching son to skateboard" />
        </div>
      </div>
    </div>
  );
};

export default Register;
