import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import userService from '../services/user.js';


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
    error: "",
    success: false,
  });

  const { username, firstName, lastName, password, email, address, city, postCode, DOB, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    // prevent browser from reloading
    event.preventDefault();
    setValues({ ...values, error: false });
    
    userService.register(username, firstName, password, email, address, DOB, lastName, city, postCode).then((response) => {
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
          error: "",
          success: true,
        });
      }
    });
  };

  const registerForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">First Name</label>
        <input
          onChange={handleChange("firstName")}
          type="text"
          className="form-control"
          value={firstName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Last Name</label>
        <input
          onChange={handleChange("lastName")}
          type="text"
          className="form-control"
          value={lastName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Address</label>
        <input
          onChange={handleChange("address")}
          type="text"
          className="form-control"
          value={address}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">City</label>
        <input
          onChange={handleChange("city")}
          type="text"
          className="form-control"
          value={city}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Postcode</label>
        <input
          onChange={handleChange("postCode")}
          type="text"
          className="form-control"
          value={postCode}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Date Of Birth</label>
        <input
          onChange={handleChange("DOB")}
          type="text"
          className="form-control"
          value={DOB}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
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
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/login">log in</Link>
    </div>
  );

  return (
    <Layout
      title="Register "
      description="Register for a new account"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {registerForm()}
    </Layout>
  );
};

export default Register;
