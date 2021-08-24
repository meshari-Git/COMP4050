const express = require('express')  
const database = require('../database')
const User = database.UserSchema;
const Favour = database.FavourSchema;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const favours = require('../models/favours');


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

    const user = await getUser(decodedToken.username)

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
    //const user = await verifyLogin(req)
    const user = await getUser(username)
    const EMAIL = await getEmail(email)

    if(!user){
       return res.status(401).json({error: "Login or create an account to access this page"})
    }

    return res.json(user)
    
    


})


//Homepage Favours
apiRouter.get("/api/", async (req , res) => {
    await Favour.find({})
    .then(result =>{
        res.json(result)
    })
})

//Adding new Favour 
apiRouter.post("/api/new-favour" , async (req, res) => {
    const {title, description, cost, status, city, streetAddress , username} = req.body
    
    const user = await getUser(username)
    if (!user){
        // User is not logged-in
        return res.status(401).json({error: "Login to access this page"})
    }
    //const userSchema = await 
    const OwnerId = user._id.toString()

    const newFavour = new Favour({
        ownerID: OwnerId,
        description: description,
        title: title,
        status: 0,
        cost: cost,
        city: city,
        streetAddress: streetAddress
    })

    newFavour.save()
    .then(result => {
        res.status(201).json(result)
    })

})
module.exports = apiRouter