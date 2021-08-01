import React from "react";
import "./changeInfo.css";
import { Link } from "react-router-dom";
import { Component } from "react";

class changeInfo extends Component {
  render() {
    return (
      <div className="changeAddress-Page">
        <div className="changeAddress">
          <div className="card-header">Change Personal Information</div>
          <div className="card-body">
            <form classname="addressform">
              <div className="form-group">
                <label>New Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label>New Address</label>
                <input type="text" className="form-control" />
              </div>
              <Link to="/profile">
                <button type="submit" className="btn btn-primary submit-btn">
                  Submit
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default changeInfo;
