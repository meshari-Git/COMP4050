/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
//Express server intitiation 
const express = require('express') 
const cors = require('cors')
const apiRouter = require("./controllers/api")


const app = express() 
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'))
app.use(apiRouter)
app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app
