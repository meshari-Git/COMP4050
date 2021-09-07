import axios from 'axios'

const baseURL = "http://localhost:3001/api/"

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
 const register = (username, firstName, password, email, address, DOB, lastName, city, postcode , bio ) => {
    return axios.post(baseURL + 'registration', {"username": email, 
                                                "firstName": firstName, 
                                                "password": password, 
                                                "email": email, 
                                                "address": address, 
                                                "DOB": DOB, 
                                                "lastName": lastName, 
                                                "city": city, 
                                                "postcode": postcode,
                                              "bio": "this is the bio"})
        .then(response => response.data).catch(e => null)
}

/**
 * Send A Account Update Request
 * @param object user 
 * @returns {Promise} Promise that will resolve the response data
 */
 const account_update = (user) => {
  const config = {headers: {Authorization: "bearer " + isAuthenticated().token}}
  return axios.post(baseURL + 'account_update', user, config)
      .then(response => response.data).catch(e => null)
}

/**
 * Get Profile
 * @param string token  
 * @returns {Promise} Promise that will resolve the response data
 */
 const profile = () => {
    const user = isAuthenticated()
    const config = {headers: {Authorization: "bearer " + user.token}}
    return axios.get(baseURL + 'account', config)
        .then(response => response.data).catch(e => null)
}



const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(data));
      next();
    }
};
  
const logout = (next) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      next();
    }
};
  
const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
};


const exportedObject = {
    login,
    register,
    profile,
    authenticate,
    isAuthenticated,
    logout,
    account_update
};

export default exportedObject;