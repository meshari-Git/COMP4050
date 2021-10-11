/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../assets/css/homepage.css";
import { Dropdown } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import GMap from "../components/GMap.js";
import jobService from "../services/job"
import Favour from "../components/favour.js"
import LMap from "../components/LMap.js"

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchData: '',
      order: 'a',
      dropDownState: "Sort by "
    };
  }


  updateSearchField = (event) => {
    this.setState({...this.state.searchData, searchData: event.target.value})
  }

  MyFunction() {
    console.log("lel")
  }

  handleNewFirst = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "Newest "})
    this.setState({order: 'n'})
  }

  handleOldFirst = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "Oldest "})
    this.setState({order: 'o'})
  }

  handleAlphabetical = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "A - Z"})
    this.setState({order: 'a'})
  }

  handleAlphaReverse = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "Z - A"})
    this.setState({order: 'z'})
  }

  handlePriceHighLow = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "High Price"})
    this.setState({order: 'l'})
  }

  handlePriceLowHigh = (e) => {
    e.preventDefault();
    this.setState({dropDownState: "Low Price"})
    this.setState({order: 'h'})
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
                  <Dropdown.Item href="#" onClick={this.handleNewFirst}>Newest First</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={this.handleOldFirst}>Oldest First</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={this.handleAlphabetical}>A - Z</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={this.handleAlphaReverse}>Z - A</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={this.handlePriceLowHigh}>Lowest Price</Dropdown.Item>
                  <Dropdown.Item href="#" onClick={this.handlePriceHighLow}>Highest Price</Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>


          <div className="filters"></div>
          <div><Favour filter={this.state.searchData} ord={this.state.order} /></div>
        </div>
        <div className="map">
          {/*<GMap />*/}
          <LMap/>
        </div>
      </div>
    );
  }
}

export default HomePage;
