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

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })
})


// start express server
server.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})