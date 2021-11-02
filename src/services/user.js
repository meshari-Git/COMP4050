/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: @Ner0theHer0 
  * 
  */
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
        .then(response => response.data).catch(e => e.response.data)
}

/**
 * Send A Forgot Request
 * @param string email 
 * @returns {Promise} Promise that will resolve the response data
 */
 const forgot = (email) => {
  return axios.post(baseURL + 'forgot', {"email": email})
      .then(response => response.data).catch(e => null)
}

/**
 * Send A Reset Request
 * @param string password
 * * @param string password_confirm
 * @returns {Promise} Promise that will resolve the response data
 */
 const reset = (password, password_confirm, userId, resetToken) => {
  return axios.post(baseURL + 'reset', {"password": password, "password_confirm": password_confirm,  "userId": userId, "resetToken": resetToken})
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
                                                "postCode": postcode,
                                              "bio": "this is the bio"})
        .then(response => response.data).catch(e => e.response.data)
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
 * Send A Account Terminate Request
 * @param object user 
 * @returns {Promise} Promise that will resolve the response data
 */
 const account_terminate = () => {
  const config = {headers: {Authorization: "bearer " + isAuthenticated().token}}
  return axios.delete(baseURL + 'account_terminate', config)
      .then(response => response.data).catch(e => null)
}

/**
 * Get Profile Of The Current User
 * @param string token  
 * @returns {Promise} Promise that will resolve the response data
 */
 const profile = () => {
    const user = isAuthenticated()
    const config = {headers: {Authorization: "bearer " + user.token}}
    return axios.get(baseURL + 'account', config)
        .then(response => response.data).catch(e => null)
}



/**
 * Get Profile Of Another User
 * @param string token  
 * @returns {Promise} Promise that will resolve the response data
 */
 const profile_other = (username) => {
  const user = isAuthenticated()
  const config = {headers: {Authorization: "bearer " + user.token}}
  return axios.get(baseURL + 'account/' + username, config)
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
    forgot,
    reset,
    profile,
    profile_other,
    authenticate,
    isAuthenticated,
    logout,
    account_update,
    account_terminate
};

export default exportedObject;