/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import { useState, useEffect } from "react";
import jobService from "../services/job";
import "../assets/css/favours.css";
import { Link } from "react-router-dom";
import imageNotFound from "../assets/img/image-not-found.png";

function Favour(filter) {
  const [favours, setFavours] = useState([]);

  useEffect(() => {
    jobService.getFavours().then((response) => {
      setFavours(response.data);
    });
  }, []);

  const filterFavours = (list) => {
    if (filter.filter) {
      return list.filter((favour) =>
        favour.title.toLowerCase().includes(filter.filter.toLowerCase())
      );
    } else {
      return list;
    }
  };

  return (
    <div className="favourContainer">
      <table className="table">
        <tbody>
          {filterFavours(favours).map((favour) => (
            <div className="card favourCtr">
              <Link
                to={{
                  pathname: "/job",
                  state: {
                    job: favour,
                  },
                }}
              >
                <img
                  class="card-img-top"
                  src={imageNotFound}
                  alt="What the favour looks like"
                />
                <div className="card-body">
                  <tr>
                    <td>
                      <h5 className="card-title"> {favour.title}</h5>
                    </td>
                  </tr>
                  <tr>
                    <td> {favour.ownerName}</td>
                  </tr>
                  <tr>
                    <td>Cost: {favour.cost}</td>
                  </tr>
                </div>
              </Link>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Favour;
