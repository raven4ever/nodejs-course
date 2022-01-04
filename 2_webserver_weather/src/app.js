const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// set static folder
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

// custom views path
const viewsDir = path.join(__dirname, '../templates/views')
app.set('views', viewsDir)

// custom partial HBS templates (HTML header, footer etc.)
const partialsDir = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsDir)

// set templating engine to HBS
app.set('view engine', 'hbs')

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        createdByName: 'Adrian'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About HBS',
        createdByName: 'Adrian'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Helpful text!',
        title: 'Help',
        createdByName: 'Adrian'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'Must provide an address!' })
    }

    geocode(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forecast: forecastData,
                location: placeName,
                address: req.query.address
            })
        })
    })
})

// 404 pages
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        createdByName: 'Adrian',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error!',
        createdByName: 'Adrian',
        errorMessage: 'Page not found!'
    })
})

// start express server
app.listen(3000, () => {
    console.log('Server is up on port 3000...')
})