const path = require('path')
const express = require('express')

const app = express()

const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.send('<h1>Weather!</h1>')
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'forecast',
        location: 'location'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})