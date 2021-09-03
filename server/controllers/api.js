const express = require('express')  
const database = require('../database')
const User = database.UserSchema;
const Favour = database.FavourSchema;
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const favours = require('../models/favours');
const users = require('../models/users');


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
    if(user){user.password = null}
    return user
}
const getEmail = async (email) => {
    const Email = await User.findOne({ email: email })
    return Email
}

//login end-point
apiRouter.post('/api/login' , async (req, res) => {
    const {email,  password} = req.body
    //const user = await getUser(username)
    const EMAIL = await getEmail(email)

    if (EMAIL && await bcrypt.compare(password, EMAIL.password)) {
        
        const userForToken = {
            id: EMAIL.id,
            email: EMAIL.email,
            username: EMAIL.username            
        }
        
        let token = null
        try {
            token = jwt.sign(userForToken, SECRET)
        } 
        catch {
            return res.status(401).json({error: "invalid token"})
        }
        console.log(token)

        return res.status(200).json({token, username: EMAIL.username, email: EMAIL.email})
        
    } else {
        return res.status(401).json({error: "invalid email or password"})
    }



})

//registration end-point
apiRouter.post('/api/registration', async (req, res) => {

    const {username, firstName, password, email, address, DOB, lastName, city, postCode , bio } = req.body

    const user = await getUser(username)
    const EMAIL = await getEmail(email)

    if (user) {
        return res.status(409).json({error: "Username already in use, choose a different username"})
    }
    if (EMAIL) {
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
        postCode: postCode,
        bio: bio
    })

    newUser.save()
        .then(result => {
            res.json(result)
        })

})

//Personal Profile Update
apiRouter.post('/api/account_update' , async (req, res) => {
    
    const user = await verifyLogin(req)
    const newUser = req.body

    delete newUser.password
    delete newUser._id

    if(!user){
       return res.status(401).json({error: "Login or create an account to access this page"})
    }

    const userID = user._id.toString()

    users.findOneAndUpdate({_id: user._id}, newUser, function (error) {
        if (error) {
          console.log(error)
          return res.status(404).json({error: "User Not Found"})
        } else {
            users.findOne({_id: user._id}, function (err, updatedUser) {
            if (err) {
              return res.status(404).json({error: "User Not Found"})
            }
            updatedUser.password = null
            return res.status(200).json({updatedUser : updatedUser})
          })
          
        }
      }) 


})


//Personal Profile end-point 
apiRouter.get('/api/account' , async (req, res) => {

    const user = await verifyLogin(req)

    if(!user){
       return res.status(401).json({error: "Login or create an account to access this page"})
    }
    const userID = user._id.toString()
    const ownedFavours = await Favour.find({ ownerID: userID })
    const operatedFavours = await Favour.find({ operatorID: userID })
    return res.status(200).json({user : user , ownedFavours : ownedFavours , operatedFavours : operatedFavours })
    
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
    const {title, description, cost, city, streetAddress , postCode} = req.body
    
    const user = await verifyLogin(req)

    if(!user){
       return res.status(401).json({error: "Login or create an account to access this page"})
    }

    const OwnerId = user._id.toString()
    const OwnerName = user.username
    const time = new Date()
    const string = time.getFullYear() + "-" + time.getMonth() + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()

    const newFavour = new Favour({
        ownerID: OwnerId,
        description: description,
        title: title,
        status: 0,
        cost: cost,
        city: city,
        streetAddress: streetAddress,
        postCode: postCode,
        ownerName: OwnerName,
        timestamp: string
    })

    newFavour.save()
    .then(result => {
        res.status(201).json(newFavour)
    })

})

// Specific favour retrieval
apiRouter.get("/api/favours/:id" , async (req , res) => {
    await Favour.findById(req.params.id)
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.status(404).json({error: "Not found"})
    })
})
module.exports = apiRouter