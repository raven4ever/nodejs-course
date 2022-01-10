const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

// set static folder
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log('New user connected...')

    // send to current client
    socket.emit('message', generateMessage('Welcome to the chat app!'))

    // send to all but the current client
    socket.broadcast.emit('message', generateMessage('New user joined!'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        // send to all clients
        io.emit('message', generateMessage(message))
        callback('Delivered!')
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

        callback()
    })

    socket.on('disconnect', () => {
        // send to all clients
        io.emit('message', generateMessage('A user has left!'))
    })
})


// start express server
server.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})