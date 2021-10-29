/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */

const axios = require('axios')


const access_key = "245cd88887690e5d6cb28f50757f068b"     //key owner: Leon
const baseURL = "http://api.positionstack.com/v1/"


const getLatLong = (address) => {
    const params = {
        access_key, address
    }
    return axios.get(baseURL + "forward", {params})
    .then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      });
}


const exportedObject = {
    getLatLong
};

export default exportedObject;