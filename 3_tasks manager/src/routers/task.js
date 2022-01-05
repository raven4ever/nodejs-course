const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // const tsk = new Task(req.body)

    const tsk = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await tsk.save()
        res.status(201).send(tsk)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    try {
        // const tasks = await Task.find()
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate('tasks')
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findById(req.params.id)
        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const incomingUpdates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = incomingUpdates.every((updateKey) => allowedUpdates.includes(updateKey))

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid update fields!' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // method to run the mongoose middleware
        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({
            _id: req.params.id,
            owner: req.user._id
        })
        incomingUpdates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


module.exports = router