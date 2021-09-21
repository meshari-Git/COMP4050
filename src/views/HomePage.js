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
          <form className="searchBar">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              id="Search"
              onChange={this.updateSearchField}
            />
          </form>
          <div className="filters"></div>
          <div><Favour filter={this.state.searchData} /></div>
        </div>
        <div className="map">
          <GMap />
        </div>
      </div>
    );
  }
}

export default HomePage;
