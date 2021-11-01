/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: @Ben450
  * 
  */
import "bootstrap/dist/css/bootstrap.css";
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
  }, [favours]);

  const filterFavours = (list) => {
    var finalList = list
    if (filter.filter) {
      finalList = list.filter((favour) =>
        favour.title.toLowerCase().includes(filter.filter.toLowerCase())
      );
    }
    //change this to a switch later
    switch (filter.ord) {
      case 'n':
        return sortNew(finalList)
      case 'o':
        return sortOld(finalList)
      case 'a':
        return sortAlpha(finalList)
      case 'z':
        return sortAlphaReverse(finalList)
      case 'l':
        return sortLowHigh(finalList)
      case 'h':
        return sortHighLow(finalList)
      default:
        return finalList
    }
  };

  const sortOld = (list) => {
    return list.sort(function (x, y) {
      let a = new Date(x.timestamp),
          b = new Date(y.timestamp);
      return a - b;
    });
  }

  const sortNew = (list) => {
    return list.sort(function (y, x) {
      let a = new Date(x.timestamp),
          b = new Date(y.timestamp);
      return a - b;
    });
  }

  const sortAlpha = (list) => {
    return list.sort(function (x, y) {
      let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  const sortAlphaReverse = (list) => {
    return list.sort(function (y, x) {
      let a = x.title.toUpperCase(),
          b = y.title.toUpperCase();
      return a === b ? 0 : a > b ? 1 : -1;
    });
  }

  const sortHighLow = (list) => {
    return list.sort(function (x, y) {
      return x.cost - y.cost;
    });
  }

  const sortLowHigh = (list) => {
    return list.sort(function (y, x) {
      return x.cost - y.cost;
    });
  }

  const getDate = (e) => {
    const year = e.substring(0,4)
    const month = e.substring(5, e.indexOf('-', 5))
    const dayLoc =  e.indexOf('-', 5) + 1
    const day = e.substring(dayLoc, e.indexOf(' ', dayLoc))
    return day + "/" + month + "/" + year
  }


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
                {(favour.images && favour.images.length > 0) &&
                  <img
                  class="card-img-top"
                  src={"/image/" + favour.images[0]}
                  alt="What the favour looks like"
                />
                }
                {(!favour.images || !(favour.images.length > 0)) &&
                  <img
                  class="card-img-top"
                  src={imageNotFound}
                  alt="What the favour looks like"
                />
                }
                
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
                  <tr>
                    <td>Requested: {getDate(favour.timestamp)}</td>
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
