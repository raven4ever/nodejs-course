const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e0207288dc27e267507a6897b8df057a&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocodng service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            currentTemp = body.current.temperature
            feelsLikeTemp = body.current.feelslike
            weatherDescription = body.current.weather_descriptions[0]

            callback(undefined, weatherDescription + '. It is currently ' + currentTemp + ' degrees out. Feels like ' + feelsLikeTemp + ' degrees.')
        }
    })
}

module.exports = forecast