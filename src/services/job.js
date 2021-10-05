/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
import axios from 'axios'

const baseURL = "http://localhost:3001/api/"

/**
 * Insert a new job into the database.
 * @param JSON job
 * @returns {promise} 
 */
const addJob = (job, token) => {
    const config = {headers: {Authorization: "bearer " + token}}
    
    return axios.post(baseURL + 'new-favour', 
        {
            "title": job.title,
            "description": job.description,
            "cost": job.cost,
            "city": job.city,
            "streetAddress": job.streetAddress,
        }, config
    ).then(response => response.data).catch(e => null)
}

const delFavour = (favourId, token) => {
    const config = {headers: {Authorization: "bearer " + token}}
    axios.delete(baseURL + "favour/" + favourId.ownerID, config)
    .then(response => {
        console.log(response)
    }).catch(e => null)
}

const editFavour = (job, token) => {
    const config = {headers: {Authorization: "bearer " + token}}
    axios.put(baseURL + "job/"+ job._id, {
            job
        }, config)
    .then(response => response.data).catch(e => null)
}

const getFavours = () => {
    return axios.get(baseURL)
}

const cancelFavour = (favour , token) => {
    const config = {headers: {Authorization: "bearer " + token}}
    axios.post(baseURL + "favours/cancel/" + favour._id, favour, config)
    .then(response =>{
        response.data()
    })
    .catch(e => null)
}

const acceptFavour = (favour , token) => {
    const config = {headers: {authorization: "bearer " + token}}
    axios.post(baseURL + "favours/accept/" + favour._id , favour , config)
    .then(response => {
        response.data() 
    })
    .catch(e => null)
}

const exportedObject = {
    addJob,
    delFavour,
    editFavour,
    getFavours,
    cancelFavour,
    acceptFavour
};

export default exportedObject;