const mongooseConnection = require('../config/connection')
const User  = require('../models/users')
const Thought = require('../models/thoughts')
const usersSeeds = require('./users.json')
const thoughtsSeeds = require('./thoughts.json')

mongooseConnection.once('connected', async () => {
    await User.deleteMany()
    await Thought.deleteMany()

    await User.insertMany(usersSeeds)
    console.log('Users seeded!')
    await Thought.insertMany(thoughtsSeeds)
    console.log('Thoughts seeded!')

    // for (const thought of thoughtsSeeds) {
    //   const user = await User.findOne({ username: thought.username }); // Find the user by username
    //   if (user) {
    //       const newThought = await Thought.create({ ...thought, userId: user._id });
    //       user.thoughts.push(newThought._id);
    //       await user.save();
    //   }
    // }  

    console.log('Seed script complete!')

    process.exit(0)
})