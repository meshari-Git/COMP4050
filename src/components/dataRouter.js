import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import UserProfile from "./userProfile/userProfile";
import Header from "./HeadingBar";
import ChangeInfo from "./userProfile/changeInfo";
import HomePage from "./homePage/homePage";
import Dashboard from "./dashboard/dashboard";
import JobPage from "./jobPage/jobPage";
import JobDataFill from "./dataFill/dataFillPage";
import Register from "../user/Register";
import Login from "../user/Login";
import PrivateRoute from "../auth/PrivateRoute";
import { isAuthenticated } from "../auth/index";

class dataRouter extends Component {
  constructor(props) {
    super(props);
    if (isAuthenticated()) {
      const {
        user: { _id, name, email, address, balance, about, role },
      } = isAuthenticated();
      this.state = {
        location: null,
        userID: _id,
        name: name,
        balance: balance,
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
    fetch("http://localhost:3200/jobs?fetch=true")
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

  /* */

  render() {
    return (
      <BrowserRouter>
        <Header
          userID={this.state.userID}
          name={this.state.name}
          balance={this.state.balance}
        />
        <div className="app">
          <Switch>
            <Route path="/changeinfo">
              <ChangeInfo />
            </Route>

            <Route path="/datafill">
              <JobDataFill />
            </Route>

            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute component={UserProfile} path="/profile" exact />

            <Route
              exact
              path="/add"
              render={(props) => (
                <JobDataFill {...props} userID={this.state.userID} />
              )}
            />

            <Route
              exact
              path="/edit"
              render={(props) => (
                <JobDataFill {...props} userID={this.state.userID} />
              )}
            />

            <PrivateRoute
              component={Dashboard}
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

export default dataRouter;
