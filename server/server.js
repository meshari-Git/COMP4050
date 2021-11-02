/** @license 4050 Boyz
  * Copyright (c) 4050 Boyz, Inc. and its affiliates.
  *
  * Authors: 
  * 
  */
require('dotenv').config()
const app = require('./app')

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
