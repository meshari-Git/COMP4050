const express = require('express')  
const database = require('../database')
const User = database.UserSchema;
const Favour = database.FavourSchema;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const apiRouter = express.Router()

const SECRET = process.env.SECRET


//Authentication functions
const passwordHashing = (password) => {
    const pass = bcrypt.hash(password , 10)
    return pass
}

const getTokenFrom = request => {
    const authorization = request.get('authorization') 
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
           return authorization.substring(7)  
        }  
    return null
}

const verifyLogin = async request => {
    const token = getTokenFrom(request)
    let decodedToken = null

    try {
        decodedToken = jwt.verify(token, SECRET)
    }
    catch {
        decodedToken = {id: null}
    }

    if (!token || !decodedToken.id) {
        return null
    }

    const user = await getUser(decodedToken.email)

    if (!user) {
        return null
    }

    return user
}

//helper functions
const getUser = async (username) => {
    const user = await User.findOne({ username: username })
    return user
}
const getEmail = async (email) => {
    const Email = await User.findOne({ email: email })
    return Email
}

//login end-point
apiRouter.post('/api/login' , async (req, res) => {
    const {email, username , password} = req.body
    const user = await getUser(username)
    const EMAIL = await getEmail(email)


    if (user && EMAIL && await bcrypt.compare(password, user.password)) {
        
        const userForToken = {
            id: user.id,
            email: user.email            
        }
        
        let token = null
        try {
            token = jwt.sign(userForToken, SECRET)
        } 
        catch {
            return res.status(401).json({error: "invalid token"})
        }

        return res.status(200).json({token, username: user.username, email: user.email})
        
    } else {
        return res.status(401).json({error: "invalid email or password"})
    }



})

//registration end-point
apiRouter.post('/api/registration', async (req, res) => {

    const {username, firstName, password, email, address, DOB, lastName, city, postcode } = req.body

    const user = await getUser(user)
    const EMAIL = await getEmail(email)

    if (user) {
        return res.status(409).json({error: "Username already in use, choose a different username"})
    }
    if (email) {
        return res.status(409).json({error: "Email already in use"})
    }

    
    const hashPass = await passwordHashing(password)

    const newUser = new User({
        username: username,
        firstName: firstName,
        password: hashPass,
        email: email,
        address: address,
        DOB: DOB,
        lastName: lastName,
        city: city,
        postCode: postcode
    })

    newUser.save()
        .then(result => {
            res.json(result)
        })

})

//Personal Profile end-point 
apiRouter.get('/api/account' , async (req, res) => {

    const {username , email} = req.body
    user = await User.findOne({username: username})
    EMAIL  = await getEmail(email)
    if(!user){
       return res.status(404).json({error: "Login or create an account to access this page"})
    }
    user.then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(404).json({error: "Login to your account first"})
    })


})


module.exports = apiRouter