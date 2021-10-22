/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: @J5kinner @Ben450
  * 
  */
import React, { useState, useEffect } from "react";
import "../assets/sass/components/navbar.scss";
import { Link, withRouter, useLocation } from "react-router-dom";
import $ from "jquery";
import userService from "../services/user.js";

const NavBar = ({ history }) => {
  const location = useLocation()
 
  /**
   * 
   * @param {Object} newTabAnimate
   * @param {Object} activeTabAnimate - Finds the currently selected Tab which has the ".active" keyword
   * @param {Object} activeTabNewWidth - Currently selected Tab box width
   * @param {Object} activeTabNewHeight - Currently selected Tab box height
   * @param {Object} itemAnimationPosTop - Position/sizing of the circles which surround the tab box
   * @param {Object} itemAnimationPosLeft - Position/sizing of the circles which surround the tab box
   * @returns {Variables} Returns the variables needed to move the navbar shapes
   */

  function animation() {
    //Automatically finds the active tab and moves to it
    var newTabAnimate = $("#navbarSupportedContent");
    var activeTabAnimate = newTabAnimate.find(".active");
    var activeTabNewWidth = activeTabAnimate.innerWidth();
    var activeTabNewHeight = activeTabAnimate.innerHeight();
    var itemAnimationPosTop = activeTabAnimate.position();
    var itemAnimationPosLeft = activeTabAnimate.position();
    $(".nav-selector").css({
      width: activeTabNewWidth + "px",
      height: activeTabNewHeight + "px",
      top: itemAnimationPosTop.top + "px",
      left: itemAnimationPosLeft.left + "px",
    });

    //Manually finding the active tab
    $("#navbarSupportedContent").on("click", "li", function (e) {
      $("#navbarSupportedContent ul li").removeClass("active");
      $(this).addClass("active");
      var activeTabNewWidth = $(this).innerWidth();
      var activeTabNewHeight = $(this).innerHeight();
      var itemAnimationPosTop = $(this).position();
      var itemAnimationPosLeft = $(this).position();
      $(".nav-selector").css({
        width: activeTabNewWidth + "px",
        height: activeTabNewHeight + "px",
        top: itemAnimationPosTop.top + "px",
        left: itemAnimationPosLeft.left + "px",
      });
    });
  }
  /**
   * Now the animation is looking for the "active" tab 
   * The if statements give the active class based on the current URL
   * @param location returns the location of the current page including URL path
   * @returns {animation} Returns the animation per refresh/click
   */

  useEffect(() => {
    $(document).ready(function(e){
      if(location.pathname === "/"){
          $(".nav-item-1").addClass("active");
          animation()
      }
      if(location.pathname === "/profile"){
        $(".nav-item-2").addClass("active");
        animation()
      }
      if(location.pathname === "/job/new"){
        $(".nav-item-3").addClass("active");
        animation()
      }
      if(location.pathname !== "/job/new" || location.pathname !== "/profile"  || location.pathname !== "/" || location.pathname !== "/job"){
        $(".nav-item").addClass("active");
        animation()
      }
    });
    $("#navbarSupportedContent ul li").removeClass("active");

    $(window).on("resize", function () {
      setTimeout(function () {
        animation();
      }, 1);
    });
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-mainbg">
      <div className="logoDiv">
        <a className="navbar-logo navbar-brand" href="/splash">
          <i className="fas fa-retweet"></i>
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
        <ul className="navbar-nav mx-auto" id="myTab">
          <div className="nav-selector">
            <div className="left"></div>
            <div className="right"></div>
          </div>
         
          <li className="nav-item-1 active" data-toggle="tab">
            <Link className="nav-link" to="/" >
              <i className="fas fa-home"></i>Home
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item-2"  data-toggle="tab">
            <Link className="nav-link" to="/profile" >
              <i className="far fa-address-book"></i>My Profile
            </Link>
          </li>
          <li className="nav-item-3" data-toggle="tab">
            <Link className="nav-link" to="/job/new" >
              <i className="fas fa-thumbs-up"></i>Need a Favour?
            </Link>
          </li>
          <li className="nav-item" data-toggle="tab">
          </li>
        </ul>
      </div>

      {/* {!userService.isAuthenticated() && (
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
     
    )} */}

      {!userService.isAuthenticated() && (
        <div>
          <Link className="nav-link" to="/login">
            <button
              className="navbtn btn btn-light my-2 my-sm-0 border border-dark"
              type="submit"
            >
              Sign-in / Join
            </button>
          </Link>
        </div>
      )}

      {userService.isAuthenticated() && (
        <div>
          <Link
            className="nav-link"
            onClick={() =>
              userService.logout(() => {
                history.push("/");
              })
            }
          >
            <button
            
              className=" navbtn btn btn-light my-2 my-sm-0 border border-dark"
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
