require('./db/mongoose')
const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
    const usr = new User(req.body)

    try {
        await usr.save()
        res.status(201).send(usr)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    const incomingUpdates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age']
    const isValidUpdate = incomingUpdates.every((updateKey) => allowedUpdates.includes(updateKey))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update fields!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/tasks', async (req, res) => {
    const tsk = new Task(req.body)

    try {
        await tsk.save()
        res.status(201).send(tsk)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const incomingUpdates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = incomingUpdates.every((updateKey) => allowedUpdates.includes(updateKey))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update fields!' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

// start express server
app.listen(port, () => {
    console.log('Server is up on port ' + port + '...')
})