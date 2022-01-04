const path = require('path')
const express = require('express')

const app = express()

// set static folder
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

// set templating engine
app.set('view engine', 'hbs')

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adrian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About HBS',
        name: 'Adrian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Helpful text!'
    })
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'forecast',
        location: 'location'
    })
})

// start express server
app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})