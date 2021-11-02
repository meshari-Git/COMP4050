/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
require('dotenv').config()
const app = require('./app')


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port 3001`)
})
