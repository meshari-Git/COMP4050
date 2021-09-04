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

const delFavour = (favourId) => {
    axios.delete(baseURL, favourId)
    .then(response => {
        console.log(response).catch(e => null)
    })
}

const editFavour = (job) => {
    axios.put(baseURL + job.id, {
            "ownerID": job.ownerID,
            "title": job.title,
            "description": job.description,
            "cost": job.cost,
            "status": job.status,
            "city": job.city,
            "streetAddress": job.address,
            "operatorID": job.operatorID
        })
    .then(response => {
        console.log(response)
        const updateFavour = job.slice()
        updateFavour[job.id] = response
        // setFavours(updateFavour)
    })
}

const getFavours = () => {
    return axios.get(baseURL)
}

const exportedObject = {
    addJob,
    delFavour,
    editFavour,
    getFavours
};

export default exportedObject;