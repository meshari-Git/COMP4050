import React, { useState } from "react";
import Layout from "../components/Layout";
import { Link, Redirect } from "react-router-dom";
import userService from '../services/user.js';
import jobService from '../services/job.js';


const CreateJob = () => {
  
    const user = userService.isAuthenticated()

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

  const { title, description, cost, city, streetAddress, postCode, success, error } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    
    // prevent browser from reloading
    event.preventDefault();
    setValues({ ...values, error: false });
    
    jobService.addJob({
        "title": title,
        "description": description,
        "cost": cost,
        "city": city,
        "streetAddress": streetAddress,
    }, user.token)
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
      })
  };

  if(!userService.isAuthenticated()) {
      return (
          <Redirect to="/login"></Redirect>
      )
  }

  const createJobForm = () => (
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
