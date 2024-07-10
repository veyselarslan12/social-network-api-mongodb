const mongooseConnection = require('../config/connection')
const { User, Thought } = require('../models')
const usersSeeds = require('./users.json')
const thoughtsSeeds = require('./thoughts.json')

mongooseConnection.once('connected', async () => {
    await User.deleteMany()
    await Thought.deleteMany()

    await User.insertMany(usersSeeds)
    console.log('Users seeded!')
    await Thought.insertMany(thoughtsSeeds)
    console.log('Thoughts seeded!')



    console.log('Seed script complete!')

    process.exit(0)
})