const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const weatherBaseUrl = 'http://api.weatherstack.com/current?access_key=e0207288dc27e267507a6897b8df057a&query=' + latitude + ',' + longitude

    request({ url: weatherBaseUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geocodng service!', undefined)
        } else if (response.body.error) {
            callback(response.body.error.info, undefined)
        } else {
            currentTemp = response.body.current.temperature
            feelsLikeTemp = response.body.current.feelslike
            weatherDescription = response.body.current.weather_descriptions[0]

            callback(undefined, weatherDescription + '. It is currently ' + currentTemp + ' degrees out. Feels like ' + feelsLikeTemp + ' degrees.')
        }
    })
}

module.exports = forecast