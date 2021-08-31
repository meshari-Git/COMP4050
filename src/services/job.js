import axios from 'axios'

const baseURL = "dummyURL/TODO/"

/**
 * Insert a new job into the database.
 * @param JSON job
 * @returns {promise} 
 */
const addJob = (job) => {
    return axios.post(baseURL + 'TODO', 
        {
            "ownerID": job.ownerID,
            "title": job.title,
            "description": job.description,
            "cost": job.cost,
            "status": job.status,
            "city": job.city,
            "streetAddress": job.address,
            "operatorID": job.operatorID
        }
    ).then(response => response.data).catch(e => null)
}

const delFavour = (favourId) => {
    axios.delete(baseURL, favourId)
    .then(response => {
        console.log(response).catch(e => null)
    })
}

const editFavour = (favour) => {
    axios.put(baseURL + favour.id, {
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
        const updateFavour = favours.slice()
        updateFavour[favour.id] = response
        setFavours(updateFavour)
    })
}

const exportedObject = {
    addJob,
    delFavour,
    editFavour
};

export default exportedObject;