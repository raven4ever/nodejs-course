const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

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
    socket.emit('message', 'Welcome user!')
    // send to all but the current client
    socket.broadcast.emit('message', 'New user joined!')

    socket.on('sendMessage', (message) => {
        // send to all clients
        io.emit('message', message)
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })

    socket.on('disconnect', () => {
        // send to all clients
        io.emit('message', 'A user has left!')
    })
})


// start express server
server.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})