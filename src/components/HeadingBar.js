import React from 'react';
import './headingBar.css'
import {
    Link,
    withRouter
} from "react-router-dom";

import {logout, isAuthenticated} from '../auth/index'


const HeadingBar = ({ history }) => (
    // TODO: add logo here
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="logoDiv">
            <a className="logoDiv navbar-brand" href="/">
                SwapStreet
            </a>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <Link to="/">
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </Link>
    
                <Link to="/profile">
                    <a className="nav-link" href="/profile">My Profile</a>
                </Link>
                <Link to="/dashboard">
                    <a className="nav-link" href="/profile">My Dashboard</a>
                </Link>

                
            </ul>
        </div>

        {!isAuthenticated() && (
            <div className="nav-link">
                <Link to='/register'>
                <button className="btn btn-light my-2 my-sm-0 border border-dark" type="submit">Register</button>
                </Link>
            </div>         
        )}

        {!isAuthenticated() && (
            <div className="nav-link">
                <Link to='/login'>
                <button className="btn btn-light my-2 my-sm-0 border border-dark" type="submit">Login</button>
                </Link>
            </div>
        )}

        {isAuthenticated() && (
            <div className="nav-link">
                <Link onClick={() => logout(() => {
                    history.push('/')
                })}>
                    <button className="btn btn-light my-2 my-sm-0 border border-dark" type="submit">Logout</button>
                </Link>
            </div>
        )}

        
    </nav>
);

export default withRouter(HeadingBar);