import React, { useState } from "react";
import Layout from "../components/Layout";
import { Redirect } from "react-router-dom";
// import { login, authenticate, isAuthenticated } from "../authentication/apiindex";
import userService from '../services/user.js';

const Login = () => {
  const [values, setValues] = useState({
    email: "userSwapStreet@email.com",
    password: "123456",
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
    
    userService.login(values.email, values.password)
        .then(response => {
              
          setValues({ ...values, error: false, password: "" });
          if(!response || response === null) {
            setValues({ ...values, error: "Invalid Username or Password", loading: false });
            return
          }
          console.log(response)
          
          //Stores the user object in local storage
          userService.authenticate(response, () => {
            setValues({...values,redirectToReferrer: true}); //Update the redirect value to true
          }) 
        })
        .catch(err => {
            console.log(err)
            setValues({ ...values, error: "Invalid Username or Password", loading: false });
            return
        })
  };

  const registerForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user) {
        return <Redirect to="/profile" />;
      }
    }
  };

  return (
    <Layout
      title="Login "
      description="Welcome Back"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {registerForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Login;
