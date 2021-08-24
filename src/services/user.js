import axios from 'axios'

const baseURL = "/api/"

/**
 * Send A Login Request
 * @param string email 
 * @param string password 
 * @returns {Promise} Promise that will resolve the response data
 */
const login = (email, password) => {
    return axios.post(baseURL + 'login', {"email": email, "password": password})
        .then(response => response.data).catch(e => null)
}


/**
 * Send A Registration Request
 * @param string email 
 * @param string password 
 * @returns {Promise} Promise that will resolve the response data
 */
 const register = (username, firstName, password, email, address, DOB, lastName, city, postcode ) => {
    return axios.post(baseURL + 'registration', {"username": username, 
                                                "firstName": firstName, 
                                                "password": password, 
                                                "email": email, 
                                                "address": address, 
                                                "DOB": DOB, 
                                                "lastName": lastName, 
                                                "city": city, 
                                                "postcode": postcode})
        .then(response => response.data).catch(e => null)
}


const exportedObject = {
    login,
    register
};

export default exportedObject;