/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import axios from 'axios'
import { useState } from 'react'


const access_key = "245cd88887690e5d6cb28f50757f068b"     //key owner: Leon
const baseURL = "http://api.positionstack.com/v1/"


// const getLatLong = async (query) => {
//   const params = {
//     access_key: access_key,
//     query: query,
//     country: "AU",
//     limit: 1,
//   }

//   return axios.get(baseURL + "forward", { params })
//     .then(response => {
//       console.log(response.data);
//     }).catch(error => {
//       console.log(error);
//     });
// }


// const getLatLong = async (query) => {
//   const params = {
//     access_key: access_key,
//     query: query,
//     country: "AU",
//     limit: 1,
//   }

//   try {
//     const response = await axios.get(baseURL + "forward", { params });
//     console.log(response.data);
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// }


const getLatLong = async (query) => {
  const params = {
    access_key: access_key,
    query: query,
    country: "AU",
    limit: 1,
  }

  return await axios.get(baseURL + "forward", { params })
}


const exportedObject = {
  getLatLong,
};

export default exportedObject;