import React, { useEffect } from "react";
import "../assets/css/navbar.css";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";

import { logout, isAuthenticated } from "../authentication/apiindex";

const NavBar = ({ history }) => {
  // navbar animation 
  function animation(){
    var newTabAnimate = $('#navbarSupportedContent');
    var activeTabAnimate = newTabAnimate.find('.active');
    var activeTabNewWidth = activeTabAnimate.innerWidth();
    var activeTabNewHeight = activeTabAnimate.innerHeight();
    var itemAnimationPosTop = activeTabAnimate.position();
    var itemAnimationPosLeft = activeTabAnimate.position();
    $(".nav-selector").css({
      "top":itemAnimationPosTop.top + "px", 
      "width": activeTabNewWidth + "px",
      "height": activeTabNewHeight + "px",
      "left":itemAnimationPosLeft.left + "px"
    });
    $("#navbarSupportedContent").on("click","li",function(e){
      $('#navbarSupportedContent ul li').removeClass("active");
      $(this).addClass('active');
      var itemAnimationPosTop = $(this).position();
      var activeTabNewWidth = $(this).innerWidth();
      var activeTabNewHeight = $(this).innerHeight();
      var itemAnimationPosLeft = $(this).position();
      $(".nav-selector").css({
        "top":itemAnimationPosTop.top + "px", 
        "width": activeTabNewWidth + "px",
        "height": activeTabNewHeight + "px",
        "left":itemAnimationPosLeft.left + "px",
      });
    });
  }

  useEffect(() => {
    animation();
    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 1);
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <div className="logoDiv">
        <a className="navbar-logo navbar-brand" href="/">
          <i class="fas fa-retweet"></i>
          SwapStreet
        </a>
      </div>

      <button
        className="navbar-toggler"
        onClick={function () {
          setTimeout(function () {
            animation();
          });
        }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">

          <div className="nav-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <i class="fas fa-home"></i>Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              <i className="far fa-address-book"></i>My Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="far fa-chart-bar"></i>My Dashboard
            </Link>
          </li>
        </ul>
      </div>
      
    {!isAuthenticated() && (
      <div >
        <Link className="nav-link" to="/register">
          <button
            className="btn btn-light my-2 my-sm-0 border border-dark"
            type="submit"
          >
            Register
          </button>
        </Link>
        </div>
     
    )}

    {!isAuthenticated() && (
      <div >
        <Link className="nav-link" to="/login">
          <button
            className="btn btn-light my-2 my-sm-0 border border-dark"
            type="submit"
          >
            Login
          </button>
        </Link>
      </div>
    )}

    {isAuthenticated() && (
      <div>
        <Link className="nav-link"
          onClick={() =>
            logout(() => {
              history.push("/");
            })
          }
        >
          <button
            className="btn btn-light my-2 my-sm-0 border border-dark"
            type="submit"
          >
            Logout
          </button>
        </Link>
      </div>
    )}
    </nav>
  );
};

export default withRouter(NavBar);
