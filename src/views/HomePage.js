import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/homepage.css";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import GMap from "../components/GMap.js";
import jobService from "../services/job"
import Favour from "../components/Favour"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: '',
    };
  }


  updateSearchField = (event) => {
    this.setState({...this.state.searchData, searchData: event.target.value})
  }

  render() {
    

    return (
      <div className="homePage">
        <div className="homeContainer">
          <form style={{height: '50px', width: '100%'}}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="Search"
              onChange={this.updateSearchField}
            />
          </form>
          <div className="test"><Favour filter={this.state.searchData} /></div>

        </div>
        <div >
          Map goes here
        </div>
        {/* <GMap /> Google Maps for the homepage here */}
      </div>
    );
  }
}

export default HomePage;
