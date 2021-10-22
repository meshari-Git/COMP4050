/** @license 4050 Boyz
 * Copyright (c) 4050 Boyz, Inc. and its affiliates.
 *
 * Authors: @J5kinner
 *
 */

import React from "react";
import "../assets/sass/pages/splash/splash.scss";
import map from "../assets/img/splash/map.png";

import LeonStatic from "../assets/img/splash/LeonStatic.png";
import JonahStatic from "../assets/img/splash/JonahStatic.png";
import MeshStatic from "../assets/img/splash/MeshStatic.png";
import BenStatic from "../assets/img/splash/benStatic.png";

import Leon from "../assets/img/splash/leon.gif";
import Jonah from "../assets/img/splash/jonah.gif";
import Malachi from "../assets/img/splash/Mal.png";
import Meshari from "../assets/img/splash/Meshari.gif";
import Ben from "../assets/img/splash/Ben.gif";

function SplashPage() {
  return (
    <div className="splash">
      <div className="spacer layer1"></div>

      <section className=" spacer2 layer2">
        <div className="layer2 text-box">
          <h1>Welcome to SwapStreet</h1>
          <p>
            The most powerful SwapStreet site ever is here. With the
            blazing-fast leaflet maps and express APIs running off a MongoDB
            database designed for pro favour doers — you get groundbreaking
            favour performance and amazing support from our team. Add to that a
            stunning favour request system, the best map and log in security
            ever in a web application. The first website of its kind, this
            Swapstreet site is a beast.
          </p>
        </div>
      </section>

      <section className="spacer2 layer3">
        <div className="left-content">
          <div className="left-text">
            <h1>Find a helping hand with our Live Map</h1>
            <p>
              SwapStreet takes the exceptional performance of the leaflet map
              architecture to a whole new level for pro favour users. Even the
              most ambitious projects are easily handled with any task being
              available for requesting, from gardening, to fixing that old car
              in your garage, and tutoring your kids for that math test coming
              up, the possibilities are endless.
            </p>
          </div>

          <div className="map-img">
            <img src={map} alt="A Map of Macquarie/Ryde area" />
          </div>
        </div>
      </section>

      <section className=" light-blue">
        <div className="right-content">
          <div className="right-text">
            <h1>
              <italics>A Favour for a Favour</italics>
            </h1>
            <p>
              The coolest part. Advanced favour transaction systems allow users
              to both serve and request favours which means everyone in the
              community can benefit from the favours. The favourer can then earn
              coins so that they can also request their own favours.
            </p>
          </div>
          <div className="map-img">
            <img src={map} alt="A Map of Macquarie/Ryde area" />
          </div>
        </div>
      </section>
      <section className="spacer2 layer4">
      <div className="devteam-profiles">
          <h1>Our Development Team</h1>
          <p>
            SwapStreet is a creative, lightweight, clean & super responsive app.
          </p>

          <div className="gifs">
            <div className="profile ">
              <div>
                <img
                  class="static"
                  src={JonahStatic}
                  alt="One frame of Leon's Gif"
                />
                <img
                  class="active"
                  src={Jonah}
                  alt="animating Jonah bit emoji"
                />
              </div>
              <div>
                <h5>Jonah Skinner</h5>
                <h6>Front-End Engineer</h6>
              </div>
            </div>

            <div className="profile">
              <div>
                <img
                  class="static"
                  src={LeonStatic}
                  alt="One frame of Leon's Gif"
                />
                <img class="active" src={Leon} alt="animating Leon bit emoji" />
              </div>
              <div>
                <h5>Leon Johan-Mosi</h5>
                <h6>Front-End Engineer</h6>
              </div>
            </div>

            <div className="profile">
              <div>
                <img
                  class="static"
                  src={MeshStatic}
                  alt="One frame of Leon's Gif"
                />
                <img
                  class="active"
                  src={Meshari}
                  alt="animating Meshari bit emoji"
                />
              </div>
              <div>
                <h5>Meshari Algethami</h5>
                <h6>Back-End Engineer</h6>
              </div>
            </div>

            <div className="profile">
              <div>
                <img
                  class="static"
                  src={BenStatic}
                  alt="One frame of Leon's Gif"
                />
                <img class="active" src={Ben} alt="animating Ben bit emoji" />
              </div>
              <div>
                <h5>Ben Fricke</h5>
                <h6>Back-End Engineer</h6>
              </div>
            </div>
            <div className="profile">
              <div>
                <img
                  class="active"
                  src={Malachi}
                  alt="animating Malachi bit emoji"
                />
              </div>
              <div>
                <h5>Malachi Mashiah</h5>
                <h6>Back-End Engineer</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="spacer layer5">
       
      </section>
    </div>
  );
}

export default SplashPage;
