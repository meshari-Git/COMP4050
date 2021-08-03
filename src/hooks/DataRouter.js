import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Profile from "../components/Profile";
import Header from "./NavBar";
import ChangeInfo from "../components/JSX/ChangeInfo.jsx";
import HomePage from "../views/HomePage";
import DashBoard from "../views/DashBoardPage";
import JobPage from "../views/JobPage";
import DataFill from "../components/JSX/DataFill";
import Register from "../views/Register";
import Login from "../views/Login";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "../authentication/apiindex";

class Router extends Component {
  constructor(props) {
    super(props);
    if (isAuthenticated()) {
      const {
        user: { _id, name, email, address, balance, about, role },
      } = isAuthenticated();

      this.state = {
        location: null,
        userID: _id,
        email: email,
        address: address,
        name: name,
        balance: balance,
        about: about,
        role: role,
        jobs: [],
      };
    } else {
      this.state = {
        location: null,
        userID: null,
        name: null,
        balance: null,
        jobs: [],
      };
    }
  }

  componentDidMount() {
    this.updateJobs();
  }

  updateJobs() {
    fetch("http://localhost:3000/jobs?fetch=true")
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          jobs: data,
        });
      });
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

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute component={Profile} path="/components/Profile.js" exact />

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

export default Router;
