const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017', {
    user: 'root',
    pass: 'examplepassword',
    dbName: 'task-manager-api'
})
