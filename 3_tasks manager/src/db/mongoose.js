const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {
    user: process.env.MONGO_USR,
    pass: process.env.MONGO_PASS,
    dbName: process.env.MONGO_DB
})
