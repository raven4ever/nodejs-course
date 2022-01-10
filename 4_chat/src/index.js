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

let count = 0

io.on('connection', (socket) => {
    console.log('New user connected')

    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // emits to a single client
        // socket.emit('countUpdated', count)
        // emit to all connections
        io.emit('countUpdated', count)
    })
})


// start express server
server.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})