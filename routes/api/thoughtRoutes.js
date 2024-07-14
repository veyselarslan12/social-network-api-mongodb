const router = require('express').Router()
const { User, Thought } = require('../../models')

// Gets all the thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (error) {
        res.status(500).send('Error getting all the thoughts.')
    }
})

// Gets one thought by thought's id
router.get('/:_id', async (req, res) => {
    const{ _id } = req.params
    try {
        const thought = await Thought.findById(_id)
        res.json(thought)
    } catch (error) {
        res.status(500).send('Error getting thought.')
    }
})

// Creates a new thought
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

// Updates thought by thought's id
router.put('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const updatedThought = await Thought.findByIdAndUpdate(_id, req.body, { new: true })
        res.json(updatedThought)
    } catch (error) {
        res.status(500).send('Error updating thought.')
    }
})

// Delete thought by thought's id
router.delete('/:_id', async (req, res) => {
    const { _id } = req.params
    try {
        const deletedThought = await Thought.findByIdAndDelete(_id)
        // TODO: Ask teacher
    } catch (error) {
        res.status(500).send('Error deleting thought.')
    }
})

router.post('/:thoughtId/reactions', async (req, res) => {
    const { thoughtId } = req.params
    try {
        
    } catch (error) {
        
    }
})

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router