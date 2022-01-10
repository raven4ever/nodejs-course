const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

// set static folder
const publicDir = path.join(__dirname, '../public')
app.use(express.static(publicDir))

io.on('connection', (socket) => {
    console.log('New connection...')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        // send to current client
        socket.emit('message', generateMessage('Admin','Welcome to the chat app!'))

        // send to all but the current client
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        // send to all clients
        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback('Delivered!')
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))

        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            // send to all clients
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
        }
    })
})


// start express server
server.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})