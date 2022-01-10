const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

// set static folder
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

// start express server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})