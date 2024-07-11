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
        const newThought = await Thought.create(req.body._id)

        // await User.findByIdAndUpdate(req.body)
    } catch (error) {
        
    }
})

router.put('/', async (req, res) => {
    
})

router.delete('/', async (req, res) => {
    
})