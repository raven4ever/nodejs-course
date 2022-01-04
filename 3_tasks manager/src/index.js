require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const usr = new User(req.body)

    usr.save()
        .then(() => { res.status(201).send(usr) })
        .catch((error) => { res.status(400).send(error) })
})

app.get('/users', (req, res) => {
    User.find()
        .then((users) => { res.send(users) })
        .catch((error) => { res.status(500).send() })
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                return res.status(404).send()
            }
            res.send(user)
        })
        .catch((error) => { res.status(500).send() })
})

app.post('/tasks', (req, res) => {
    const tsk = new Task(req.body)

    tsk.save()
        .then(() => { res.status(201).send(tsk) })
        .catch((error) => { res.status(400).send(error) })
})

app.get('/tasks', (req, res) => {
    Task.find()
        .then((tasks) => { res.send(tasks) })
        .catch((error) => { res.status(500).send() })
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then((task) => {
            if (!task) {
                return res.status(404).send()
            }
            res.send(task)
        })
        .catch((error) => { res.status(500).send() })
})


app.post('/users2', (req, res) => { })

// start express server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})