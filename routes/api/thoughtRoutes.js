const router = require('express').Router()
const { User, Thought } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).send('Error getting all the thoughts.')
    }
})

router.get('/:_id', async (req, res) => {
    const{ _id } = req.params
    try {
        const thought = await Thought.findById(_id)
        res.json(thought)
    } catch (error) {
        res.status(500).send('Error getting thought.')
    }
})

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body)

        await User.findOneAndUpdate({username: req.body.username}, {$push: {thoughts: newThought._id}})
        res.json(newThought)

    } catch (error) {
        console.log(error)
        res.status(500).send('Error updating thought.')
    }
})

router.put('/', async (req, res) => {
    
})

router.delete('/', async (req, res) => {
    
})


module.exports = router