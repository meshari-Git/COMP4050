import React, { useState } from "react";
import Layout from "../components/Layout";
import { Redirect } from "react-router-dom";
// import { login, authenticate, isAuthenticated } from "../authentication/apiindex";
import userService from "../services/user.js";

//image + svg + css
import Robot from "../assets/img/robo.svg";
import ProfilePic from "../assets/img/profilePic.svg";
import Wave from "../assets/img/wave.png";
import "../assets/css/login.css";

const Login = () => {
  const [values, setValues] = useState({
    email: "fake@fake.com",
    password: "bob",
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

    userService
      .login(values.email, values.password)
      .then((response) => {
        setValues({ ...values, error: false, password: "" });
        if (!response || response === null) {
          setValues({
            ...values,
            error: "Invalid Username or Password",
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
          error: "Invalid Username or Password",
          loading: false,
        });
        return;
      });
  };




  const loginForm = () => (
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
          <img src={Robot} alt="Programming a Robot" />

        </div>
        <div className="login-content">
        <img src={ProfilePic} alt="avatar" />

          <Layout title="Login" description="Welcome Back">

            {showLoading()}
            {showError()}
            {loginForm()}
            {redirectUser()}
          </Layout>
          <a href="/Register">Need an account?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
