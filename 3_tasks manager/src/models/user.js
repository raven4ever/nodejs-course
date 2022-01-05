const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Provided email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password!')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// register an instance function to obfuscate sensitive fields in responses
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.tokens
    delete userObject.password
    delete userObject.avatar

    return userObject
}

// register an instance function to generate the JWT auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1 day' })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

// register a static function into the schema to verify the credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('Unable to log in!')
    }

    const isPasswdMatch = await bcrypt.compare(password, user.password)

    if (!isPasswdMatch) {
        throw new Error('Unable to log in!')
    }

    return user
}

// middleware function to hash the password before saving
userSchema.pre('save', async function (next) {
    const usr = this

    if (usr.isModified('password')) {
        usr.password = await bcrypt.hash(usr.password, 8)
    }

    next()
})

// middleware function to delete tasks before deleting user
userSchema.pre('remove', async function (next) {
    const usr = this

    await Task.deleteMany({ owner: usr._id })

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User