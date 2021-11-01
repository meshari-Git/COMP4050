/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @Ben450 @J5kinner @LeonJM
 *
 */
import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Profile from "../components/Profile";
import ProfileOther from "../components/ProfileOther";
import Header from "./NavBar";
import ChangeInfo from "../components/JSX/ChangeInfo.jsx";
import HomePage from "../views/HomePage";
import DashBoard from "../views/DashBoardPage";
import JobPage from "../views/JobPage";
import DataFill from "../components/JSX/DataFill";
import Register from "../views/Register";
import Login from "../views/Login";
import Forgot from "../views/Forgot";
import Reset from "../views/Reset.js";
import CreateJob from "../views/CreateJob";
import PrivateRoute from "./PrivateRoute";
import jobService from "../services/job";
import SplashPage from "../views/SplashPage";


class DataRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      userID: null,
      name: null,
      balance: null,
      jobs: [],
    };
    // }
  }

  componentDidMount() {
    this.updateJobs();
  }

  updateJobs() {
    jobService.getFavours();
  }

  handleSelect(e) {
    console.log(e);
    this.setState({ location: e });
  }

  /* Router for pages*/

  render() {
    return (
      <BrowserRouter>
        <Header
          userID={this.state.userID}
          name={this.state.name}
          balance={this.state.balance}
        />
        <div className="App">
          <Switch>
            <Route path="/ChangeInfo">
              <ChangeInfo />
            </Route>
            <Route path="/datafill">
              <DataFill />
            </Route>
            <Route path="/splash" exact component={SplashPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute
              component={Profile}
              path="/components/Profile.js"
              exact
            />
            <Route
              exact
              path="/add"
              render={(props) => (
                <DataFill {...props} userID={this.state.userID} />
              )}
            />
            <Route
              exact
              path="/edit"
              render={(props) => (
                <DataFill {...props} userID={this.state.userID} />
              )}
            />
            <PrivateRoute
              component={DashBoard}
              path="/dashboard"
              jobs={this.state.jobs}
              userID={this.state.userID}
              exact
            />
            <Route path="/forgot">
              <Forgot></Forgot>
            </Route>
            <Route path="/reset/:resetToken/:userId">
              <Reset></Reset>
            </Route>
            <Route path="/profile">
              <Profile></Profile>
            </Route>
            <Route path="/user/:username">
              <ProfileOther></ProfileOther>
            </Route>
            <Route path="/job/new">
              <CreateJob></CreateJob>
            </Route>
            <Route
              exact
              path="/job"
              render={(props) => (
                <JobPage {...props} userID={this.state.userID} />
              )}
            />
            <Route path="/">
              <HomePage jobs={this.state.jobs} userID={this.state.userID} />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default DataRouter;
