import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/homepage.css";
import { Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import GMap from "../components/GMap.js";
import jobService from "../services/job"
import Favour from "../components/favour.js"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: '',
      dropDownState: "Sort by"
    };
  }


  updateSearchField = (event) => {
    this.setState({ ...this.state.searchData, searchData: event.target.value })
  }

  MyFunction() {
    console.log("lel")
  }

  render() {


    return (
      <div className="homePage">
        <div className="homeContainer">
          <div className="ctr">
            <div className="sb">
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
            </div>
            <div className = "dd">
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {this.state.dropDownState}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as="button" >Newest First</Dropdown.Item>
                  <Dropdown.Item href="#" >Oldest First</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>


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
