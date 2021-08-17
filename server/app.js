//Express server intitiation 
const express = require('express') 
const cors = require('cors')

const app = express() 
app.use(cors())
app.use(express.json()) 
app.use(express.static('build'))
app.use(apiRouter)

module.exports = app
